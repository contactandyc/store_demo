import { ChangeEvent, useState } from 'react';
import { FileContents } from '../interfaces/Interfaces';

interface UploaderProps {
  accept?: string; // Custom accept criteria for file types
  readAsText?: boolean; // vs readAsBinary
  onFilesSelected: (filesWithContents: FileContents[]) => void;
}

const Uploader: React.FC<UploaderProps> = ({ accept = '.csv', readAsText = true, onFilesSelected }) => {
  const [selectedFiles, setSelectedFiles] = useState<FileContents[]>([]);

  const readContents = async (file: File): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target && event.target.result) {
          resolve(event.target.result as string);
        } else {
          reject(new Error('Failed to read file'));
        }
      };

      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };

      if (readAsText) {
        reader.readAsText(file);
      } else {
        reader.readAsBinaryString(file);
      }
    });
  };

  const handleFileInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const newFiles = Array.from(files);

      // Check if the newFiles are not already in the selectedFiles array
      const uniqueNewFiles = newFiles.filter(
        (newFile) => !selectedFiles.some((selectedFile) => selectedFile.file.name === newFile.name)
      );

      // Read the contents of the new files
      const filesWithContents: FileContents[] = await Promise.all(
        uniqueNewFiles.map(async (file) => {
          const contents = await readContents(file);
          return { file, contents };
        })
      );

      setSelectedFiles([...selectedFiles, ...filesWithContents]);
      onFilesSelected([...selectedFiles, ...filesWithContents]);
    }
  };

  const handleRemoveFile = (fileToRemove: File) => {
    const updatedFiles = selectedFiles.filter((file) => file.file !== fileToRemove);
    setSelectedFiles(updatedFiles);
    onFilesSelected(updatedFiles);
  };

  return (
    <div className="mt-4">
      <input
        type="file"
        accept={accept}
        multiple
        onChange={handleFileInputChange}
        className="hidden"
        id="fileInput"
      />
      <label
        htmlFor="fileInput"
        className="cursor-pointer block p-2 bg-blue-500 text-white rounded-md"
      >
        Select Files
      </label>
      <ul className="mt-2">
        {selectedFiles.map((fileContent) => (
          <li key={fileContent.file.name} className="flex items-center">
            <span>{fileContent.file.name}</span>
            <button
              onClick={() => handleRemoveFile(fileContent.file)}
              className="ml-2 text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Uploader;
