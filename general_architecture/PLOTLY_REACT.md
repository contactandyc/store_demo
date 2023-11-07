To create an interactive graph in Next.js that replicates the Jupyter workflow using Plotly and calls a pre-built REST API, you'll need to adapt the workflow for a web environment. Here's how you can achieve that:

1. **Set Up Your Next.js Environment**:

   Ensure you have a Next.js project set up and ready to go. If you need to create a new project, you can do so by running `npx create-next-app my-project`.

2. **Install Necessary Packages**:

   ```bash
   npm install plotly.js react-plotly.js axios
   ```

3. **Create a React Component to Fetch and Display Data**:

   ```jsx
   // components/InteractiveGraph.js
   import React, { useState, useEffect } from 'react';
   import Plot from 'react-plotly.js';
   import axios from 'axios';

   const InteractiveGraph = ({ apiUrl }) => {
     const [data, setData] = useState([]);
     const [layout, setLayout] = useState({});

     useEffect(() => {
       // Fetch data from the REST API
       axios.get(apiUrl)
         .then((response) => {
           const responseData = response.data;
           // Transform data to the format Plotly expects, similar to the Jupyter example
           const trace = {
             x: responseData.map(item => item.sale_date),
             y: responseData.map(item => item.sale_amount),
             type: 'scatter',
             mode: 'lines+markers'
           };
           setData([trace]);
           // Set the layout for the plot
           setLayout({
             title: 'Sales Over Time',
             xaxis: { title: 'Date' },
             yaxis: { title: 'Sale Amount' }
           });
         })
         .catch((error) => {
           console.error("Error fetching data: ", error);
         });
     }, [apiUrl]);

     return (
       <Plot
         data={data}
         layout={layout}
       />
     );
   };

   export default InteractiveGraph;
   ```

4. **Use the Component in Your Page**:

   ```jsx
   // pages/index.js
   import InteractiveGraph from '../components/InteractiveGraph';

   const Home = () => {
     return (
       <div>
         <h1>Sales Data</h1>
         <InteractiveGraph apiUrl="/api/sales-data" />
       </div>
     );
   };

   export default Home;
   ```

5. **Create the API Route**:

   If you don't have the API set up in your Next.js app and you're relying on an external API, make sure to configure the correct endpoint in the `InteractiveGraph` component.

   If you do need an API route in Next.js to handle data transformation or fetching from an external source, here's an example:

   ```jsx
   // pages/api/sales-data.js
   export default function handler(req, res) {
     // Assuming this function fetches data from an external API or database
     getSalesData()
       .then(data => {
         res.status(200).json(data);
       })
       .catch(error => {
         res.status(500).json({ error: "Internal server error" });
       });
   }
   ```

6. **Run Your Next.js Application**:

   ```bash
   npm run dev
   ```

Navigate to the page where you have used the `InteractiveGraph` component to see the interactive graph.

Please note that the REST API should return the data in the same format expected by Plotly. Adjust the code to match the data structure you receive from your API.