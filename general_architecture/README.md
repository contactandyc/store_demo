Using Google Cloud, React + Redux + Tailwind CSS, PostgreSQL + Sequelize, Shopify, Kubernetes, HTTPS, Google's WAF, Datadog, and the ELK stack is a robust choice for your store demo. Here’s how you can leverage these technologies:

**Google Cloud Platform (GCP):**
- Use **Google Kubernetes Engine (GKE)** to deploy and manage your application containers.
- Store your PostgreSQL database in **Cloud SQL** for fully managed database services.
- Utilize **Identity-Aware Proxy (IAP)** for secure authentication and **Cloud IAM** for permission management.
- **Google Cloud Storage** for object storage requirements.
- Use **Cloud Load Balancing** to distribute traffic across your instances in GKE.

**Frontend:**
- Develop the UI with **React**, managing state with **Redux**.
- Use **Tailwind CSS** for styling and ensuring a responsive design.
- Secure the frontend with HTTPS, using certificates managed by **Google-managed SSL certificates**.

**Backend:**
- Write backend services using **Node.js**, connecting to PostgreSQL through **Sequelize** ORM.
- Develop RESTful APIs for communication between the frontend and backend.
- Implement merchant authentication using **OAuth 2.0** with help from GCP's security components.

**Shopify Integration:**
- Utilize the **Shopify Admin API** to interact with the Shopify platform for payment and order data.

**Security:**
- Employ **Google Cloud’s Web Application Firewall (WAF)** to protect your web applications from common exploits.
- Ensure all connections are encrypted using HTTPS, with SSL certificates.

**Monitoring and Logging:**
- Integrate **Datadog** for monitoring application performance and infrastructure health.
- Use the **ELK Stack** (Elasticsearch for storage, Logstash for data processing, and Kibana for visualization) for logging. This can be hosted on GCP using their respective managed services or as containers in GKE.

**Compliance:**
- Follow **PCI DSS** requirements when handling and storing payment data.

**Development and Operations:**
- Employ **Cloud Build** for continuous integration and **Cloud Deploy** for continuous delivery.
- Use **Container Registry** for storing your Docker images.
- Integrate **Cloud Operations (formerly Stackdriver)** for additional monitoring, logging, and diagnostics.

**Backup and Disaster Recovery:**
- Regular backups with **Cloud SQL's automated backups** feature.
- Implement a disaster recovery plan using GCP's regional and multi-regional storage options.

When you design your system with these technologies, ensure that you architect your system in a manner that supports scalability, maintainability, and high availability. Keep in mind that your choice of tools should also align with your development team's expertise and the operational capacity to maintain the infrastructure post-deployment.