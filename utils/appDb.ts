import { openDB, type DBSchema, type IDBPDatabase } from 'idb';
import { type User } from '@microsoft/microsoft-graph-types'

interface AppDbSchema extends DBSchema {
    tenantUsers: {
      key: number
      value: {
        tenant: string
        user: User
      }
      indexes: { 'tenant': string, 'tid': string[], 'tname': string[] }
    }
  }

let appDb: IDBPDatabase<AppDbSchema>|undefined = undefined;

async function initialize()
{
    appDb = await openDB<AppDbSchema>("azidentity.demo", 3, {
        upgrade(db)
        {
            const userStore = db.createObjectStore('tenantUsers', { autoIncrement: true })
            userStore.createIndex('tenant', 'tenant')
            userStore.createIndex('tid', ['tenant', 'user.id'])
            userStore.createIndex('tname', ['tenant', 'user.displayName'])
        }
    })
}

export async function updateDbUsers(tenant:string, users:User[]) {
    console.log("update() #items", users.length)

    if (!appDb && import.meta.client) {
        await initialize()
    }

    if (!appDb) {
        console.error("updateDbUsers(): DB not ready")
        return;
    }

    // Delete all existing users

    const transaction = appDb.transaction(["tenantUsers"], "readwrite");
    const objectStore = transaction.objectStore("tenantUsers");
    const index = objectStore.index("tenant")

    for await (const cursor of index.iterate()) {
        cursor.delete();
    }
    
    // Add new users

    for (const user of users) {
        await objectStore.add({ tenant, user })
    }

    // And commit it
    await transaction.done
}

export async function getDbusers(tenant:string): Promise<User[]> {

    const isclient = import.meta.client
    if (!appDb && isclient) {
        await initialize()
    }
    
    if (!appDb) {
        console.error("updateDbUsers(): DB not ready, client?", isclient)
        return [];
    }

    // We want all users in this tenant, sorted by displayName 
    const lowerBound = [tenant, ''];
    const upperBound = [tenant, 'zzz'];
    const range = IDBKeyRange.bound(lowerBound, upperBound);

    const transaction = appDb.transaction(["tenantUsers"], "readwrite");
    const objectStore = transaction.objectStore("tenantUsers");
    const index = objectStore.index("tname")
    const found = await index.getAll( range )
    return found.map(x=>x.user)
}