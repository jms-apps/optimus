import { PageContainer } from '../components/page-container';
import { PageTitle } from '../components/page-title';
import { createColumnHelper } from '@tanstack/react-table';
import { useState } from 'react';
import { SimpleTable } from '../components/simple-table';

interface Inventory {
  sku: string;
  title: string;
  barcodeNumber: number;
  retailPrice: number;
  purchasePrice: number;
  stockLevel: number;
  inOpenOrders: number;
  available: number;
  minimumLevel: number;
}

const defaultData: Inventory[] = [
  {
    sku: 'testSku',
    title: 'My first product',
    barcodeNumber: 112233445566,
    retailPrice: 50.55,
    purchasePrice: 40.4,
    stockLevel: 40,
    inOpenOrders: 10,
    available: 40,
    minimumLevel: 10,
  },
  {
    sku: 'testSku',
    title: 'My first product',
    barcodeNumber: 112233445566,
    retailPrice: 150.55,
    purchasePrice: 40.4,
    stockLevel: 40,
    inOpenOrders: 10,
    available: 40,
    minimumLevel: 10,
  },
  {
    sku: 'testSku',
    title: 'My first product',
    barcodeNumber: 112233445566,
    retailPrice: 50.55,
    purchasePrice: 40.4,
    stockLevel: 40,
    inOpenOrders: 10,
    available: 40,
    minimumLevel: 10,
  },
  {
    sku: 'testSku',
    title: 'My first product',
    barcodeNumber: 112233445566,
    retailPrice: 50.55,
    purchasePrice: 40.4,
    stockLevel: 40,
    inOpenOrders: 10,
    available: 40,
    minimumLevel: 10,
  },
  {
    sku: 'testSku',
    title: 'My first product',
    barcodeNumber: 112233445566,
    retailPrice: 50.55,
    purchasePrice: 40.4,
    stockLevel: 40,
    inOpenOrders: 10,
    available: 40,
    minimumLevel: 10,
  },
  {
    sku: 'testSku',
    title: 'My first product',
    barcodeNumber: 112233445566,
    retailPrice: 50.55,
    purchasePrice: 40.4,
    stockLevel: 40,
    inOpenOrders: 10,
    available: 40,
    minimumLevel: 10,
  },
  {
    sku: 'testSku',
    title: 'My first product',
    barcodeNumber: 112233445566,
    retailPrice: 50.55,
    purchasePrice: 40.4,
    stockLevel: 40,
    inOpenOrders: 10,
    available: 40,
    minimumLevel: 10,
  },
];

const columnHelper = createColumnHelper<Inventory>();

const columns = [
  columnHelper.accessor((row) => row.sku, {
    id: 'sku',
    cell: (info) => info.getValue(),
    header: () => 'SKU',
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.title, {
    id: 'title',
    cell: (info) => info.getValue(),
    header: () => 'Title',
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.barcodeNumber, {
    id: 'barcodeNumber',
    cell: (info) => info.getValue(),
    header: () => 'Barcode Number',
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.retailPrice, {
    id: 'retailPrice',
    cell: (info) => info.getValue(),
    header: () => 'Retail Price',
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.purchasePrice, {
    id: 'purchasePrice',
    cell: (info) => info.getValue(),
    header: () => 'Purchase Price',
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.stockLevel, {
    id: 'stockLevel',
    cell: (info) => info.getValue(),
    header: () => 'Stock Level',
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.inOpenOrders, {
    id: 'inOpenOrders',
    cell: (info) => info.getValue(),
    header: () => 'In Open Orders',
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.available, {
    id: 'available',
    cell: (info) => info.getValue(),
    header: () => 'Available',
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.minimumLevel, {
    id: 'minimumLevel',
    cell: (info) => info.getValue(),
    header: () => 'Minimum Level',
    footer: (info) => info.column.id,
  }),
];

export function MyInventory() {
  const [data] = useState(() => [...defaultData]);
  return (
    <PageContainer>
      <PageTitle title="My Inventory" />
      <SimpleTable<Inventory> columns={columns} data={data} />
    </PageContainer>
  );
}
