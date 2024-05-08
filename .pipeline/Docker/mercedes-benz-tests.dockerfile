# Use a Node.js base image
FROM mercedes-mercedes-benz-tests

ENV CI=true


# Install dependencies
CMD [ "yarn", "test" ]

