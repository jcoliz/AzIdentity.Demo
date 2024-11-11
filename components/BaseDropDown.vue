<template>
    <div>
        <ClientOnly>        
            <BaseDropDownClientOnly>
                <template #trigger>
                    <slot name="trigger"/>
                </template>
                <template #default>
                    <slot/>
                </template>
            </BaseDropDownClientOnly>
            <template #fallback>
                <div>
                    <slot name="trigger"/>
                </div>
            </template>
        </ClientOnly>
    </div>
</template>
