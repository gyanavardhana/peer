# Use the Grafana base image
FROM grafana/grafana:7.1.5

# Copy the Grafana datasources configuration file into the container
COPY datasources.yml /etc/grafana/provisioning/datasources/datasources.yml

# Expose the Grafana port
EXPOSE 8080

# Copy the environment variables file into the container
COPY .env /etc/grafana/.env

# Set environment variables from the .env file
ENV $(cat /etc/grafana/.env | xargs)

# Start Grafana
CMD ["grafana-server", "--homepath=/usr/share/grafana"]
