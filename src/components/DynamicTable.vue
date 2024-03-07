<template>
    <div>
        <vue-good-table :columns="columns" :rows="rows" />
    </div>
</template>

<script>
export default {
    name: 'DynamicTable',
    props: {
        columns: {
            type: Array,
            required: true,
        },
        rows: {
            type: Array,
            required: true,
        }
    }
};
</script>

