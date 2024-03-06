# Use an official Python runtime as a parent image
FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container
WORKDIR /app

# Install system dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    libpq-dev \
    gcc \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt /app/
RUN python -m venv venv
RUN /app/venv/bin/pip install --upgrade pip && /app/venv/bin/pip install -r requirements.txt

# Copy the rest of your application code
COPY . /app/

# Expose the port the app runs on
EXPOSE 8000

# Command to run the application
CMD ["/app/venv/bin/python", "manage.py", "runserver", "0.0.0.0:8000"]
