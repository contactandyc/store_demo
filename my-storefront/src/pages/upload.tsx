import { useState } from 'react';
import Uploader from '../components/Uploader';
import { FileContents } from '../interfaces/Interfaces';
import { parseCSV, CSVRow } from '../utils/parseCSV';

export default function Home() {
  const [selectedFiles, setSelectedFiles] = useState<FileContents[] | null>(null);

  const handleFilesSelected = async (files: FileContents[] | null) => {
    setSelectedFiles(files);
    try {
      for(const f of files) {
        const parsedData: CSVRow[] = await parseCSV(f.contents);
        console.log(parsedData); // Array of objects representing CSV data
      }
    } catch (error) {
      console.error('Error parsing CSV:', error);
    }
    // console.log(files);
    // Process the selected CSV files as needed
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-semibold mb-4">CSV File Uploader</h1>
      <Uploader onFilesSelected={handleFilesSelected} />
      {/* Render and process the selected CSV files here */}
    </div>
  );
}
