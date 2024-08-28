<template>
    <footer>
        M2I Formation © 2024
    </footer>
</template>

<style scoped>
footer {
    position: fixed;
    font-size: small;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    padding: 1rem;
}

@media (min-width: calc(320px + 1px)) {
    footer {
        padding: 0.5rem;
    }
}
</style>
