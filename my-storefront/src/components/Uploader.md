Component: `Uploader`

### What it is:
`Uploader` is a React component that provides a file input for users to upload files. It handles reading file contents as text or binary string and maintains the state of selected files along with their contents.

### How to use it:

1. **Import the component** in the file where you want to enable file uploads:
   ```tsx
   import Uploader from './components/Uploader';
   ```

2. **Use the `<Uploader>` component** in your JSX, passing the required `onFilesSelected` callback and optional `accept` and `readAsText` props:
   ```tsx
   <Uploader
     accept=".txt"
     readAsText={true}
     onFilesSelected={(filesWithContents) => { /* handle selected files with contents */ }}
   />
   ```

### Props:

- `accept`: Specifies the file types that the user can pick from the file input dialog (optional, default is `.csv`).
- `readAsText`: Determines whether the file should be read as text (`true`) or as a binary string (`false`) (optional, default is `true`).
- `onFilesSelected`: A callback function that receives an array of `FileContents` objects, each containing a `File` object and its contents as a string, whenever files are selected or removed.

### Internal Logic:

- When the user selects files, the `handleFileInputChange` function filters out files that have already been selected, reads the contents of the new files, and updates the component's state.
- The `readContents` function uses a `FileReader` to asynchronously read the content of each file as text or binary string, based on the `readAsText` prop.
- The `handleRemoveFile` function allows removal of a selected file from the current state and invokes the `onFilesSelected` callback with the updated list.

### Styling:

- There is a label styled with a background color (`bg-blue-500`), text color (`text-white`), and rounded corners (`rounded-md`), which acts as the visible part of the file input.
- There's also a list of selected files, each with a "Remove" button that allows for the de-selection of files. This button has a red text color (`text-red-600`) that becomes darker on hover (`hover:text-red-800`).

### Accessibility:

- The actual file input is visually hidden (`hidden`), and interaction is handled through a styled label, which improves the aesthetics and usability of the file input field.
