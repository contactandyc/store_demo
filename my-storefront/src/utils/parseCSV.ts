import * as csvParser from 'csv-parser';

export interface CSVRow {
  [key: string]: string;
}

export async function parseCSV(csvContent: string): Promise<CSVRow[]> {
  return new Promise<CSVRow[]>((resolve, reject) => {
    const parsedData: CSVRow[] = [];
    const parser = csvParser();

    parser.on('data', (data) => {
      parsedData.push(data);
    });

    parser.on('end', () => {
      resolve(parsedData);
    });

    parser.on('error', (error) => {
      reject(error);
    });

    // Parse the CSV content
    parser.write(csvContent);
    parser.end();
  });
}
