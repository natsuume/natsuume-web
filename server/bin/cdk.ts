#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { BaseStack } from "../lib/BaseStack";
import { DeployStack } from "../lib/DeployStack";

const app = new cdk.App();

const baseStack = new BaseStack(app, "natsuume-dev_base-stack");

const deployStack = new DeployStack(app, "natsuume-dev_deploy-stack", baseStack.frontEndBucket);

cdk.Tags.of(app).add("project", "natsuume-dev");
