import { Callout } from '@/components/Callout';
import { CodeBlock } from '@/components/CodeBlock';
import { Tabs, Tab } from '@/components/Tabs';
import { Table } from '@/components/Table';

export const callout = {
  render: 'Callout',
  attributes: {
    type: {
      type: String,
      default: 'note',
      matches: ['note', 'warning', 'info', 'tip', 'danger'],
    },
    title: {
      type: String,
    },
  },
};

export const tabs = {
  render: 'Tabs',
  attributes: {
    labels: {
      type: Array,
    },
  },
  transform(node, config) {
    const labels = node.transformChildren(config).map((child) => child.attributes?.label);
    return {
      ...node,
      attributes: { ...node.attributes, labels },
    };
  },
};

export const tab = {
  render: 'Tab',
  attributes: {
    label: {
      type: String,
      required: true,
    },
  },
};

export const table = {
  render: 'Table',
  attributes: {},
};
