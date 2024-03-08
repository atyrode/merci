import { config, mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import VueGoodTable from 'vue-good-table-next';
import DynamicTable from '../components/DynamicTable.vue';

config.global.components = {
  'vue-good-table-next': VueGoodTable,
};

describe('DynamicTable', () => {
    it('renders correctly', () => {
        const wrapper = mount(DynamicTable, {
            global: {
                stubs: {
                    'vue-good-table': true // Stubbing 'vue-good-table-next'
                }
            },
            props: {
                columns: [],
                rows: []
            },
        });
        expect(wrapper.html()).toMatchSnapshot();
        expect(wrapper.find('vue-good-table-stub').exists()).toBe(true);
        // Ensure the table is empty
        expect(wrapper.find('vue-good-table-stub').text()).toBe('');
    })
});

describe('DynamicTable with data', () => {
    it('renders correctly', () => {
        const wrapper = mount(DynamicTable, {
            global: {
                stubs: {
                    'vue-good-table': true // Stubbing 'vue-good-table-next'
                }
            },
            props: {
                columns: [
                    { label: 'Name', field: 'name' },
                    { label: 'Age', field: 'age' },
                ],
                rows: [
                    { name: 'John Doe', age: 30 },
                    { name: 'Jane Doe', age: 25 },
                ]
            },
        });
        expect(wrapper.html()).toMatchSnapshot();
        expect(wrapper.find('vue-good-table-stub').exists()).toBe(true);
        // Ensure the table is not empty
        expect(wrapper.find('vue-good-table-stub').attributes('columns')).not.toBe('');
        expect(wrapper.find('vue-good-table-stub').attributes('rows')).not.toBe('');
    })
});