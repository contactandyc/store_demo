To save on hardware and cloud costs, consider the following strategies tailored for Google Cloud and the technology stack you've chosen:

**1. Use Managed Services:**
- **Cloud SQL**: Use a shared-core instance for your PostgreSQL database if the load is low.
- **App Engine**: For less complex applications, App Engine can be more cost-effective than GKE.

**2. Optimize Kubernetes Costs:**
- Use **GKE's autopilot mode**, which automatically manages and scales the underlying infrastructure.
- Leverage **preemptible VMs** for workloads that can handle interruptions.
- Implement **Horizontal Pod Autoscaling** to automatically adjust the number of pods to the workload needs.

**3. Efficient Data Storage:**
- Employ lifecycle policies in **Cloud Storage** to downgrade to colder storage classes or delete old data.

**4. Optimize Computing Resources:**
- Use **custom machine types** in GCE to tailor the CPU and memory to your application's specific needs.
- Monitor and reduce idle resources with the help of **Cloud Monitoring**.

**5. Networking:**
- **Network Egress**: Optimize data transfer costs by keeping traffic within the same region and using CDN caching where possible.

**6. Caching:**
- Implement **caching** at various levels (e.g., database results, HTTP responses) to reduce the number of read operations and the load on your servers.

**7. Scaling:**
- Implement **automatic scaling** policies to adjust to the traffic patterns.
- Scale down during off-peak hours to reduce costs.

**8. CI/CD and Development Environments:**
- Optimize **CI/CD pipelines** by minimizing build times and shutting down resources when not in use.
- Use lower-cost resources for development and testing environments.

**9. Monitoring and Logging:**
- Use **Log-based metrics** in Cloud Logging to turn logs into metrics and alarms to only retain essential logs.
- Streamline your **Datadog** usage by focusing on key performance indicators.

**10. Commit to Use:**
- Consider **committed use discounts** in GCP for significant cost savings over time.

**11. Review and Optimize Regularly:**
- Regularly review and analyze your cloud spending with **Cloud Billing Reports** and **Cost Management tools**.

**12. Go Serverless:**
- Whenever possible, consider using **serverless solutions** (like Cloud Functions or Firestore) which scale to zero and you pay only for what you use.

**13. Efficient Frontend Hosting:**
- For static content, consider using a cost-effective solution like **Firebase Hosting**.

**14. Database Cost Optimization:**
- Regularly prune and index your database to keep performance up and costs down.
- Use database read replicas wisely; they can provide high availability and load balancing for read-heavy workloads.

**15. Cache Shopify API Calls:**
- Implement a caching layer for your Shopify API calls to minimize the number of requests and potentially reduce the need for larger, more expensive API rate limits.

**16. Use the Free Tier:**
- Google Cloud provides a free tier for many services, ensure you are leveraging this where possible.

**Compliance and Security:**
- While optimizing costs, ensure you do not compromise on security and compliance needs, especially around payment processing (PCI DSS).

By carefully planning your architecture, monitoring your usage, and making adjustments, you can optimize cloud costs while still maintaining the performance and scalability of your services.