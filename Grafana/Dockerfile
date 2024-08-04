# Use the Grafana base image
FROM grafana/grafana:7.1.5

# Copy the Grafana datasources configuration file into the container
COPY datasources.yml /etc/grafana/provisioning/datasources/datasources.yml

# Expose the Grafana port
EXPOSE 3000

# Set environment variables directly in the Dockerfile
ENV GF_AUTH_DISABLE_LOGIN_FORM=true
ENV GF_AUTH_ANONYMOUS_ENABLED=true
ENV GF_AUTH_ANONYMOUS_ORG_ROLE=Admin

# Start Grafana
CMD ["grafana-server", "--homepath=/usr/share/grafana"]
