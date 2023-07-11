# IBM watsonx


## Overview

[IBM watsonx.ai](https://www.ibm.com/products/watsonx-ai) REST API サンプル


## Pre-requisites

- [IBM Cloud](https://cloud.ibm.com/) account

- Setup [Watson Studio](https://www.ibm.com/products/watson-studio) and `Watson Machine Learning` in it for your IBM Cloud acconts:

  - At 2023-07-12, WatsonX can be activated only in **us-souch(dallas)** region.
  - Refer [this document](https://qiita.com/yanagih/items/3d1b081f46799072df80) for details.

- **IAM API Key** for your IBM Cloud account
  - Assume `xxxxxxxxxx` is your IAM API Key for following instructions

- Find `project_id` of your project.
  - You can find your project_id in your URL of your project(`yyyyyyyyyy` is your project_id in this case): `https://dataplatform.cloud.ibm.com/projects/yyyyyyyyyy?context=wx`


## How to use Swagger API document

- Install [git](https://git-scm.com/downloads) and [Node.js](https://nodejs.org/) in your system:

- `$ git clone https://github.com/dotnsf/watsonx`

- `$ cd watsonx`

- `$ npm install`

- `$ APIKEY=xxxxxxxxxx PROJECT_ID=yyyyyyyyyy node app`

- Go `http://localhost:8080/_doc`


## API Docs

https://cloud.ibm.com/apidocs/watsonxdata


## Licensing

This code is licensed under MIT.


## Copyright

2023  [K.Kimura @ Juge.Me](https://github.com/dotnsf) all rights reserved.
