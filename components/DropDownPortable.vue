<template>
    <div>
        <ClientOnly>        
            <DropDownClientOnly>
                <template #trigger>
                    <slot name="trigger"/>
                </template>
                <template #default>
                    <slot/>
                </template>
            </DropDownClientOnly>
            <template #fallback>
                <div>
                    <slot name="trigger"/>
                </div>
            </template>
        </ClientOnly>
    </div>
</template>
<style scoped>
:deep(a)
{
    cursor: pointer;
}
</style>