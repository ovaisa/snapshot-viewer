/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { BentleyCloudRpcManager } from "@bentley/imodeljs-common";
import { IModelApp } from "@bentley/imodeljs-frontend";
import { UiComponents } from "@bentley/ui-components";
import { getSupportedRpcs } from "../../common/rpcs";

/**
 * List of possible backends that basic-viewport-app can use
 */

// Boiler plate code
export class SnapshotViewerApp {

  public static async startup() {
    await IModelApp.startup({ applicationVersion: "1.0.0" });

    // contains various initialization promises which need
    // to be fulfilled before the app is ready
    const initPromises = new Array<Promise<any>>();

    // initialize RPC communication
    initPromises.push(SnapshotViewerApp.initializeRpc());

    // initialize UiComponents
    initPromises.push(UiComponents.initialize(IModelApp.i18n));

    // the app is ready when all initialization promises are fulfilled
    await Promise.all(initPromises);
  }

  private static async initializeRpc(): Promise<void> {
    const rpcParams = { info: { title: "snapshot-viewer-app", version: "v1.0" }, uriPrefix: "http://localhost:3001" };

    const rpcInterfaces = getSupportedRpcs();
    // Initialize the local backend if UseBackend.GeneralPurpose is not set.

    BentleyCloudRpcManager.initializeClient(rpcParams, rpcInterfaces);
  }

}
