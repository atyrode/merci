<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import formatFinanceData from '../services/FormatData';
import DynamicTable from './DynamicTable.vue';


/* Hree we declare the interfaces that describes columns and rows of the table
so that TypeScript knows the expected structure of the objects in your columns
and rows arrays, this is _not_ technically needed but helps the IDE not complain */
interface Column {
  label: string;
  field: string;
  type: string;
}

interface Row {
  [key: string]: string | number | Row[]; // Allow 'children' to be an array of Row
}

// Here we declare the reactive variables that will hold the columns and rows
const columns: Ref<Column[]> = ref([]);
const rows: Ref<Row[]> = ref([]);

onMounted(async () => {
    try {
        const financeData = await formatFinanceData();
        columns.value = financeData.columns;
        rows.value = financeData.rows;
    } catch (error) {
        console.error('Error processing finance data:', error);
    }
});

</script>

<template>
    <main>
        <DynamicTable :columns="columns" :rows="rows" />
    </main>
</template>