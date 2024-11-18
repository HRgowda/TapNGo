FROM node:18-alpine AS builder

WORKDIR /tapngo

# Copy the monorepo configuration and dependencies
COPY package.json package-lock.json turbo.json ./ 
COPY apps/ /tapngo/apps/
COPY packages/ /tapngo/packages/

# Install all dependencies in the monorepo
RUN npm install --legacy-peer-deps

# Generate the database schema ( so this command runs the db:generate script from root folder's package.json which is slightly different from bank-webhooks's package.json )
RUN npm run db:generate

# Build the bank-webhook package
WORKDIR /tapngo/apps/bank-webhook
RUN npm run build

# Production stage - Creating a lightweight image
FROM node:18-alpine AS runner

WORKDIR /tapngo

# Copy built app and essential files from the builder stage
COPY --from=builder /tapngo/apps/bank-webhook /tapngo/apps/bank-webhook
COPY --from=builder /tapngo/packages/ /tapngo/packages/
COPY --from=builder /tapngo/node_modules /tapngo/node_modules
COPY --from=builder /tapngo/package.json /tapngo/package.json

# ( If we are using 'start' script, it is defined in bankwebhook's package.json so changing the workdir to run the 'start' script is essential to avoid any errors in build time like 'start' command not found. )
WORKDIR /tapngo/apps/bank-webhook

# Install production dependencies for the bank-webhook package
RUN npm install --legacy-peer-deps

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD ["node", "dist/index.js"]
