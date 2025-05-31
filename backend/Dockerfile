FROM public.ecr.aws/lambda/nodejs:22

# Copy function code
WORKDIR /var/task
COPY . .

# Install deps
RUN npm install

# Set the Lambda entry point
CMD ["lambda.handler"]
