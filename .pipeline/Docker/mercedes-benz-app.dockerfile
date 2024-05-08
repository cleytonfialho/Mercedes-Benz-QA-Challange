# Use Playwright as base image
FROM mcr.microsoft.com/playwright:v1.43.1-jammy

ENV CI=true
# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock to the container
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application code to the container
COPY . .

CMD [ command ]