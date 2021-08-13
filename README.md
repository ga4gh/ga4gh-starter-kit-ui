# GA4GH Starter Kit UI

UI to view, create, edit, and delete instances of GA4GH models served by GA4GH Starter Kit web services.

## Install

* via [Dockerhub](https://hub.docker.com/repository/docker/ga4gh/ga4gh-starter-kit-ui): `docker image pull ga4gh/ga4gh-starter-kit-ui:${tag}`
  + browse [list of available tags](https://hub.docker.com/repository/docker/ga4gh/ga4gh-starter-kit-ui/tags)

## Usage

**Note:** examples using version `0.2.0`

* Run with default configuration properties:
  + `docker run -p 8989:8989 ga4gh/ga4gh-starter-kit-ui:0.2.0`
  + **Note:** `8989` is the UI server's default port inside the container
* Run with custom configuration file/properties:
  + `docker run -p ${HOST_PORT}:${CONTAINER_PORT} -v ${HOST_CONFIG_DIR}:/config ga4gh/ga4gh-starter-kit-ui:0.2.0 -c /config/${CONFIG_FILE}`
  + where:
    - `CONTAINER_PORT`: the port within the docker container that the app will run on, should correspond to the `port` property of the YAML config (see below); e.g. `4000`
    - `HOST_PORT`: the mapped port on the host machine; e.g. `80`
    - `HOST_CONFIG_DIR`: absolute file path to directory containing YAML config file; eg. `/home/user/data/ui-config`
    - `CONFIG_FILE`: name of YAML config file mounted to container; e.g. `config.yml`

### Configuration

The Starter Kit UI app can be configured to load, render and manipulate data models from **GA4GH Starter Kit Web Services** that are running within a local network or over the web. All property configuration is done via a YAML config file that is supplied to the program at runtime via a `-c ${CONFIG_FILE}` option.

The config file MUST start with a single root object named `starterKitUI`. All sub-properties are nested under `starterKitUI`.

**`starterKitUI` Properties:**

| Name | Description | Data Type | Example
|------|-------------|-----------|--------|
| port | the port that the app will run on | `integer` | `4000`
| services | list of running GA4GH Starter Kit services that the UI will reference and load data from | [`ServiceConfig`] array ||

**`ServiceConfig` Properties**

| Name | Description | Data Type | Example
|------|-------------|-----------|--------|
| serviceType | the canonical GA4GH API spec/type of the starter kit service | enum [`drs`] | `drs`
| publicURL | the URL and port serving the service's public, read-only API | URL | `https://drs1.example.com`
| adminURL | the URL and port serving the service's private, administrative API | URL | `https://drs1.example.com:6000`


**Example Starter Kit UI YAML config:**
```
starterKitUI:
  port: 4000
  services:
    - serviceType: 'drs'
      publicURL: 'https://drs1.example.com'
      adminURL: 'https://drs1.example.com:6000'
    - serviceType: 'drs'
      publicURL: 'https://drs2.example.com'
      adminURL: 'https://drs2.example.com:7000'
    - serviceType: 'drs'
      publicURL: 'https://drs3.example.com'
      adminURL: 'https://drs3.example.com:8001'
```
