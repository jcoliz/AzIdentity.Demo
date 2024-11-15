<template>
    <div data-test-id="default-layout">
        <main>
            <SiteHeader/>
            <article class="container">
                <slot/>
            </article>
            <ErrorToast/>
        </main>
    </div>
</template>