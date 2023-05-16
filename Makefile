.PHONY: clean build-prod build-uat build-dev

clean:
ifeq ($(ENV), prod)
	-docker container stop chassets-api-prod
	-docker container rm chassets-api-prod
	-docker image rm chassets-api-prod
else ifeq ($(ENV), uat)
	-docker container stop chassets-api-uat
	-docker container rm chassets-api-uat
	-docker image rm chassets-api-uat
else ifeq ($(ENV), dev)
	-docker container stop chassets-api-dev
	-docker container rm chassets-api-dev
	-docker image rm chassets-api-dev
else
	@echo "Invalid environment. Use 'ENV=prod', 'ENV=uat', or 'ENV=dev'."
endif

build-prod:
	docker compose -f docker/production/docker-compose.yml build

build-uat:
	docker compose -f docker/uat/docker-compose.yml build

build-dev:
	docker compose -f docker/dev/docker-compose.yml build


.PHONY: run-prod run-uat run-dev run-service-ssl run-service-uat

run-prod:
	$(MAKE) clean ENV=prod
	$(MAKE) build-prod
	docker compose -f docker/production/docker-compose.yml up -d

run-uat: 
	$(MAKE) clean ENV=uat
	$(MAKE) build-uat
	docker compose -f docker/uat/docker-compose.yml up -d

run-dev: 
	$(MAKE) clean ENV=dev
	$(MAKE) build-dev
	docker compose -f docker/dev/docker-compose.yml up -d

run-service-ssl:
	$(MAKE) clean ENV=prod
	$(MAKE) build-prod
	docker compose -f docker/production/docker-compose.yml up -d

run-service-uat:
	$(MAKE) clean ENV=uat
	$(MAKE) build-uat
	docker compose -f docker/uat/docker-compose.yml up -d
