<template>
    <div>
        <vue-good-table :columns="columns" :rows="rows" max-height="100vh" :fixed-header="true" styleClass="table_style"
            :group-options="{
            enabled: true,
            headerPosition: 'bottom'
        }">
            <template #table-header-row="props" >
                    <span class="average_row" v-if="props.column.field != 'id'">
                        {{ calculateAverage(props.row.children, props.column) }}
                    </span>
                    
            </template>
        </vue-good-table>
    </div>
</template>

<script lang="ts">
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
        },
    },
    methods: {
        humanFmt(value: string) {
            return value.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
        },
        calculateAverage(rows: any[], column: { field: any; type: any; }) {
            let field = column.field;
            let type = column.type;

            if (field == "hotelName") {
                return 'Average';
            }
            let sum = 0;
            rows.forEach(row => {
                sum += row[field];
            });

            let average = sum / rows.length;

            if (type == "percentage") {
                const percentage_average = average * 100;
                let nmbrFmted = percentage_average.toFixed(2);
                let humanFmted = this.humanFmt(nmbrFmted);
                return humanFmted + "%";
            }
            
            let nmbrFmted = average.toFixed(2);
            let humanFmted = this.humanFmt(nmbrFmted);

            if (field != "rooms") {
                return "$" + humanFmted;
            }
            return humanFmted;
        }
    }
};
</script>

<style lang="scss">
$base-grey: var(--vt-c-divider-dark-1) !default;

$table-bg: var(--vt-c-black-mute) !default;
$lighter-table-bg: var(--vt-c-black-soft) !default;
$darker-table-bg: var(--vt-c-black) !default;
$text-color: var(--vt-c-text-dark-1) !default;

$header-text-color: var(--vt-c-white-mute) !default;

$border-color: $base-grey !default;

$thead-bg-color-1: $darker-table-bg !default;
$thead-bg-color-2: $darker-table-bg !default;

$chevron-color: #42b883;
$chevron-color-2: #2e7e5a;
$sort-chevron-width: 7px;
$sort-chevron-margin-top: -9px; // I don't know the original implementation of the module
$sort-chevron-margin-bottom: +10%; // So I had to hack in a mix of px and % to get it to look right

// link
$link-color: #409eff;

.average_row {
    font-weight: bold;
    color: $link-color;
}

.vgt-row-header {
    background-color: $darker-table-bg;
    color: $header-text-color;
    font-weight: bold;
}

.table_style {

    // Table base style
    font-size: 16px;
    border-collapse: collapse;
    background-color: $table-bg;
    width: 100%;
    max-width: 100%;
    table-layout: auto;
    border: 1px solid $border-color;

    & td {
        padding: .75em .75em .75em .75em;
        vertical-align: top;
        border-bottom: 1px solid $border-color;
        color: $text-color;
        text-align: left;
    }

    & th {
        text-align: left;
        padding: .75em 1.5em .75em .75em;
        vertical-align: middle;
        position: relative;

        // Sorting chevrons
        &.sortable {
            button {
                -webkit-appearance: none;
                -moz-appearance: none;
                appearance: none;
                background: transparent;
                border: none;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;

                &:focus {
                    outline: none;
                }

                &:after {
                    content: '';
                    position: absolute;
                    height: 0px;
                    width: 0px;
                    right: 6px;
                    top: 50%;
                    margin-top: $sort-chevron-margin-top;
                    border-left: $sort-chevron-width solid transparent;
                    border-right: $sort-chevron-width solid transparent;
                    border-bottom: $sort-chevron-width solid $chevron-color;
                }

                &:before {
                    content: '';
                    position: absolute;
                    height: 0px;
                    width: 0px;
                    right: 6px;
                    top: 50% + $sort-chevron-margin-bottom;
                    border-left: $sort-chevron-width solid transparent;
                    border-right: $sort-chevron-width solid transparent;
                    border-top: $sort-chevron-width solid $chevron-color-2;
                }
            }
        }
    }

    // Alternating table rows color
    & tbody tr:nth-of-type(odd) {
        background-color: $lighter-table-bg;
    }

    // Table header
    thead th {
        color: $header-text-color;
        vertical-align: bottom;
        text-align: center;
        border-bottom: 1px solid $border-color;
        padding-right: 1.5em;
        background: linear-gradient($thead-bg-color-1, $thead-bg-color-2);

        &.sorting-asc button {
            &:after {
                border-bottom: $sort-chevron-width solid $link-color;
            }
        }

        &.sorting-desc button {
            &:before {
                border-top: $sort-chevron-width solid $link-color;
            }
        }
    }

    // Table borders
    & td,
    & th {
        border: 1px solid $border-color;
    }

    // Header borders
    & th.vgt-row-header {
        border-bottom: 3px solid $border-color;
    }
}
</style>