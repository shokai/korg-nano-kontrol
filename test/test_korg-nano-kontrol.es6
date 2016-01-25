/* global describe it */
"use strict";

import "./test_helper";
import {assert} from "chai";
import nanoKONTROL from "../src/korg-nano-kontrol";

describe("korg-nano-kontrol", function(){

  it("should have method \"connect\"", function(){
    assert.isFunction(nanoKONTROL.connect);
  })

});
