IMAGE_NAME = "live-chat-client"

build-image:
	docker build -t $(IMAGE_NAME) .