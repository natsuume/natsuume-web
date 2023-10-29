#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { BaseStack } from "../lib/BaseStack";
import { DeployStack } from "../lib/DeployStack";

const app = new cdk.App();

const baseStack = new BaseStack(app, "natsuume-dev-base-stack");

new DeployStack(
  app,
  "natsuume-dev-deploy-stack",
  baseStack.frontEndBucket,
  baseStack.distribution,
);

cdk.Tags.of(app).add("project", "natsuume-dev");
