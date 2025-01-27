/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../rust/pkg/rust_bg.wasm":
/*!********************************!*\
  !*** ../rust/pkg/rust_bg.wasm ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"4d918fcbbaa41c9b0050.wasm\";\n\n//# sourceURL=webpack://skiigame/../rust/pkg/rust_bg.wasm?");

/***/ }),

/***/ "../rust/pkg/rust.js":
/*!***************************!*\
  !*** ../rust/pkg/rust.js ***!
  \***************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Game: () => (/* binding */ Game),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   initSync: () => (/* binding */ initSync)\n/* harmony export */ });\nlet wasm;\nfunction addToExternrefTable0(obj) {\n  const idx = wasm.__externref_table_alloc();\n  wasm.__wbindgen_export_2.set(idx, obj);\n  return idx;\n}\nfunction handleError(f, args) {\n  try {\n    return f.apply(this, args);\n  } catch (e) {\n    const idx = addToExternrefTable0(e);\n    wasm.__wbindgen_exn_store(idx);\n  }\n}\nconst cachedTextDecoder = typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-8', {\n  ignoreBOM: true,\n  fatal: true\n}) : {\n  decode: () => {\n    throw Error('TextDecoder not available');\n  }\n};\nif (typeof TextDecoder !== 'undefined') {\n  cachedTextDecoder.decode();\n}\n;\nlet cachedUint8ArrayMemory0 = null;\nfunction getUint8ArrayMemory0() {\n  if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {\n    cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);\n  }\n  return cachedUint8ArrayMemory0;\n}\nfunction getStringFromWasm0(ptr, len) {\n  ptr = ptr >>> 0;\n  return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));\n}\nfunction isLikeNone(x) {\n  return x === undefined || x === null;\n}\nfunction debugString(val) {\n  // primitive types\n  const type = typeof val;\n  if (type == 'number' || type == 'boolean' || val == null) {\n    return `${val}`;\n  }\n  if (type == 'string') {\n    return `\"${val}\"`;\n  }\n  if (type == 'symbol') {\n    const description = val.description;\n    if (description == null) {\n      return 'Symbol';\n    } else {\n      return `Symbol(${description})`;\n    }\n  }\n  if (type == 'function') {\n    const name = val.name;\n    if (typeof name == 'string' && name.length > 0) {\n      return `Function(${name})`;\n    } else {\n      return 'Function';\n    }\n  }\n  // objects\n  if (Array.isArray(val)) {\n    const length = val.length;\n    let debug = '[';\n    if (length > 0) {\n      debug += debugString(val[0]);\n    }\n    for (let i = 1; i < length; i++) {\n      debug += ', ' + debugString(val[i]);\n    }\n    debug += ']';\n    return debug;\n  }\n  // Test for built-in\n  const builtInMatches = /\\[object ([^\\]]+)\\]/.exec(toString.call(val));\n  let className;\n  if (builtInMatches && builtInMatches.length > 1) {\n    className = builtInMatches[1];\n  } else {\n    // Failed to match the standard '[object ClassName]'\n    return toString.call(val);\n  }\n  if (className == 'Object') {\n    // we're a user defined class or Object\n    // JSON.stringify avoids problems with cycles, and is generally much\n    // easier than looping through ownProperties of `val`.\n    try {\n      return 'Object(' + JSON.stringify(val) + ')';\n    } catch (_) {\n      return 'Object';\n    }\n  }\n  // errors\n  if (val instanceof Error) {\n    return `${val.name}: ${val.message}\\n${val.stack}`;\n  }\n  // TODO we could test for more things here, like `Set`s and `Map`s.\n  return className;\n}\nlet WASM_VECTOR_LEN = 0;\nconst cachedTextEncoder = typeof TextEncoder !== 'undefined' ? new TextEncoder('utf-8') : {\n  encode: () => {\n    throw Error('TextEncoder not available');\n  }\n};\nconst encodeString = typeof cachedTextEncoder.encodeInto === 'function' ? function (arg, view) {\n  return cachedTextEncoder.encodeInto(arg, view);\n} : function (arg, view) {\n  const buf = cachedTextEncoder.encode(arg);\n  view.set(buf);\n  return {\n    read: arg.length,\n    written: buf.length\n  };\n};\nfunction passStringToWasm0(arg, malloc, realloc) {\n  if (realloc === undefined) {\n    const buf = cachedTextEncoder.encode(arg);\n    const ptr = malloc(buf.length, 1) >>> 0;\n    getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);\n    WASM_VECTOR_LEN = buf.length;\n    return ptr;\n  }\n  let len = arg.length;\n  let ptr = malloc(len, 1) >>> 0;\n  const mem = getUint8ArrayMemory0();\n  let offset = 0;\n  for (; offset < len; offset++) {\n    const code = arg.charCodeAt(offset);\n    if (code > 0x7F) break;\n    mem[ptr + offset] = code;\n  }\n  if (offset !== len) {\n    if (offset !== 0) {\n      arg = arg.slice(offset);\n    }\n    ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;\n    const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);\n    const ret = encodeString(arg, view);\n    offset += ret.written;\n    ptr = realloc(ptr, len, offset, 1) >>> 0;\n  }\n  WASM_VECTOR_LEN = offset;\n  return ptr;\n}\nlet cachedDataViewMemory0 = null;\nfunction getDataViewMemory0() {\n  if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer) {\n    cachedDataViewMemory0 = new DataView(wasm.memory.buffer);\n  }\n  return cachedDataViewMemory0;\n}\nconst GameFinalization = typeof FinalizationRegistry === 'undefined' ? {\n  register: () => {},\n  unregister: () => {}\n} : new FinalizationRegistry(ptr => wasm.__wbg_game_free(ptr >>> 0, 1));\nclass Game {\n  static __wrap(ptr) {\n    ptr = ptr >>> 0;\n    const obj = Object.create(Game.prototype);\n    obj.__wbg_ptr = ptr;\n    GameFinalization.register(obj, obj.__wbg_ptr, obj);\n    return obj;\n  }\n  __destroy_into_raw() {\n    const ptr = this.__wbg_ptr;\n    this.__wbg_ptr = 0;\n    GameFinalization.unregister(this);\n    return ptr;\n  }\n  free() {\n    const ptr = this.__destroy_into_raw();\n    wasm.__wbg_game_free(ptr, 0);\n  }\n  /**\n   * @param {number} p_height\n   * @param {number} width\n   * @param {number} tree_spawn_per_chunk\n   * @returns {Game}\n   */\n  static new(p_height, width, tree_spawn_per_chunk) {\n    const ret = wasm.game_new(p_height, width, tree_spawn_per_chunk);\n    return Game.__wrap(ret);\n  }\n  restart() {\n    wasm.game_restart(this.__wbg_ptr);\n  }\n  /**\n   * @param {number} num_of_current_chunk\n   */\n  generate_chunk(num_of_current_chunk) {\n    wasm.game_generate_chunk(this.__wbg_ptr, num_of_current_chunk);\n  }\n  /**\n   * @param {number} rotation_degree\n   */\n  change_player_rotation(rotation_degree) {\n    wasm.game_change_player_rotation(this.__wbg_ptr, rotation_degree);\n  }\n  /**\n   * @param {number} amount\n   */\n  btn_change_rotation(amount) {\n    wasm.game_btn_change_rotation(this.__wbg_ptr, amount);\n  }\n  update() {\n    wasm.game_update(this.__wbg_ptr);\n  }\n  /**\n   * @returns {any}\n   */\n  get_all_trees_for_js() {\n    const ret = wasm.game_get_all_trees_for_js(this.__wbg_ptr);\n    return ret;\n  }\n  /**\n   * @returns {any}\n   */\n  get_all_traces_for_js() {\n    const ret = wasm.game_get_all_traces_for_js(this.__wbg_ptr);\n    return ret;\n  }\n  /**\n   * @returns {boolean}\n   */\n  check_collision() {\n    const ret = wasm.game_check_collision(this.__wbg_ptr);\n    return ret !== 0;\n  }\n  /**\n   * @returns {boolean}\n   */\n  get_is_game_over() {\n    const ret = wasm.game_get_is_game_over(this.__wbg_ptr);\n    return ret !== 0;\n  }\n  /**\n   * @returns {number}\n   */\n  get_player_x() {\n    const ret = wasm.game_get_player_x(this.__wbg_ptr);\n    return ret;\n  }\n  /**\n   * @returns {number}\n   */\n  get_player_y() {\n    const ret = wasm.game_get_player_y(this.__wbg_ptr);\n    return ret;\n  }\n  /**\n   * @returns {number}\n   */\n  get_player_rotation() {\n    const ret = wasm.game_get_player_rotation(this.__wbg_ptr);\n    return ret;\n  }\n  /**\n   * @returns {number}\n   */\n  get_current_chunk() {\n    const ret = wasm.game_get_current_chunk(this.__wbg_ptr);\n    return ret;\n  }\n}\nasync function __wbg_load(module, imports) {\n  if (typeof Response === 'function' && module instanceof Response) {\n    if (typeof WebAssembly.instantiateStreaming === 'function') {\n      try {\n        return await WebAssembly.instantiateStreaming(module, imports);\n      } catch (e) {\n        if (module.headers.get('Content-Type') != 'application/wasm') {\n          console.warn(\"`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\\n\", e);\n        } else {\n          throw e;\n        }\n      }\n    }\n    const bytes = await module.arrayBuffer();\n    return await WebAssembly.instantiate(bytes, imports);\n  } else {\n    const instance = await WebAssembly.instantiate(module, imports);\n    if (instance instanceof WebAssembly.Instance) {\n      return {\n        instance,\n        module\n      };\n    } else {\n      return instance;\n    }\n  }\n}\nfunction __wbg_get_imports() {\n  const imports = {};\n  imports.wbg = {};\n  imports.wbg.__wbg_buffer_609cc3eee51ed158 = function (arg0) {\n    const ret = arg0.buffer;\n    return ret;\n  };\n  imports.wbg.__wbg_call_672a4d21634d4a24 = function () {\n    return handleError(function (arg0, arg1) {\n      const ret = arg0.call(arg1);\n      return ret;\n    }, arguments);\n  };\n  imports.wbg.__wbg_call_7cccdd69e0791ae2 = function () {\n    return handleError(function (arg0, arg1, arg2) {\n      const ret = arg0.call(arg1, arg2);\n      return ret;\n    }, arguments);\n  };\n  imports.wbg.__wbg_crypto_ed58b8e10a292839 = function (arg0) {\n    const ret = arg0.crypto;\n    return ret;\n  };\n  imports.wbg.__wbg_getRandomValues_bcb4912f16000dc4 = function () {\n    return handleError(function (arg0, arg1) {\n      arg0.getRandomValues(arg1);\n    }, arguments);\n  };\n  imports.wbg.__wbg_msCrypto_0a36e2ec3a343d26 = function (arg0) {\n    const ret = arg0.msCrypto;\n    return ret;\n  };\n  imports.wbg.__wbg_new_405e22f390576ce2 = function () {\n    const ret = new Object();\n    return ret;\n  };\n  imports.wbg.__wbg_new_78feb108b6472713 = function () {\n    const ret = new Array();\n    return ret;\n  };\n  imports.wbg.__wbg_new_a12002a7f91c75be = function (arg0) {\n    const ret = new Uint8Array(arg0);\n    return ret;\n  };\n  imports.wbg.__wbg_newnoargs_105ed471475aaf50 = function (arg0, arg1) {\n    const ret = new Function(getStringFromWasm0(arg0, arg1));\n    return ret;\n  };\n  imports.wbg.__wbg_newwithbyteoffsetandlength_d97e637ebe145a9a = function (arg0, arg1, arg2) {\n    const ret = new Uint8Array(arg0, arg1 >>> 0, arg2 >>> 0);\n    return ret;\n  };\n  imports.wbg.__wbg_newwithlength_a381634e90c276d4 = function (arg0) {\n    const ret = new Uint8Array(arg0 >>> 0);\n    return ret;\n  };\n  imports.wbg.__wbg_node_02999533c4ea02e3 = function (arg0) {\n    const ret = arg0.node;\n    return ret;\n  };\n  imports.wbg.__wbg_process_5c1d670bc53614b8 = function (arg0) {\n    const ret = arg0.process;\n    return ret;\n  };\n  imports.wbg.__wbg_push_737cfc8c1432c2c6 = function (arg0, arg1) {\n    const ret = arg0.push(arg1);\n    return ret;\n  };\n  imports.wbg.__wbg_randomFillSync_ab2cfe79ebbf2740 = function () {\n    return handleError(function (arg0, arg1) {\n      arg0.randomFillSync(arg1);\n    }, arguments);\n  };\n  imports.wbg.__wbg_require_79b1e9274cde3c87 = function () {\n    return handleError(function () {\n      const ret = module.require;\n      return ret;\n    }, arguments);\n  };\n  imports.wbg.__wbg_set_65595bdd868b3009 = function (arg0, arg1, arg2) {\n    arg0.set(arg1, arg2 >>> 0);\n  };\n  imports.wbg.__wbg_set_bb8cecf6a62b9f46 = function () {\n    return handleError(function (arg0, arg1, arg2) {\n      const ret = Reflect.set(arg0, arg1, arg2);\n      return ret;\n    }, arguments);\n  };\n  imports.wbg.__wbg_static_accessor_GLOBAL_88a902d13a557d07 = function () {\n    const ret = typeof global === 'undefined' ? null : global;\n    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);\n  };\n  imports.wbg.__wbg_static_accessor_GLOBAL_THIS_56578be7e9f832b0 = function () {\n    const ret = typeof globalThis === 'undefined' ? null : globalThis;\n    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);\n  };\n  imports.wbg.__wbg_static_accessor_SELF_37c5d418e4bf5819 = function () {\n    const ret = typeof self === 'undefined' ? null : self;\n    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);\n  };\n  imports.wbg.__wbg_static_accessor_WINDOW_5de37043a91a9c40 = function () {\n    const ret = typeof window === 'undefined' ? null : window;\n    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);\n  };\n  imports.wbg.__wbg_subarray_aa9065fa9dc5df96 = function (arg0, arg1, arg2) {\n    const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0);\n    return ret;\n  };\n  imports.wbg.__wbg_versions_c71aa1626a93e0a1 = function (arg0) {\n    const ret = arg0.versions;\n    return ret;\n  };\n  imports.wbg.__wbindgen_debug_string = function (arg0, arg1) {\n    const ret = debugString(arg1);\n    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);\n    const len1 = WASM_VECTOR_LEN;\n    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);\n    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);\n  };\n  imports.wbg.__wbindgen_init_externref_table = function () {\n    const table = wasm.__wbindgen_export_2;\n    const offset = table.grow(4);\n    table.set(0, undefined);\n    table.set(offset + 0, undefined);\n    table.set(offset + 1, null);\n    table.set(offset + 2, true);\n    table.set(offset + 3, false);\n    ;\n  };\n  imports.wbg.__wbindgen_is_function = function (arg0) {\n    const ret = typeof arg0 === 'function';\n    return ret;\n  };\n  imports.wbg.__wbindgen_is_object = function (arg0) {\n    const val = arg0;\n    const ret = typeof val === 'object' && val !== null;\n    return ret;\n  };\n  imports.wbg.__wbindgen_is_string = function (arg0) {\n    const ret = typeof arg0 === 'string';\n    return ret;\n  };\n  imports.wbg.__wbindgen_is_undefined = function (arg0) {\n    const ret = arg0 === undefined;\n    return ret;\n  };\n  imports.wbg.__wbindgen_memory = function () {\n    const ret = wasm.memory;\n    return ret;\n  };\n  imports.wbg.__wbindgen_number_new = function (arg0) {\n    const ret = arg0;\n    return ret;\n  };\n  imports.wbg.__wbindgen_string_new = function (arg0, arg1) {\n    const ret = getStringFromWasm0(arg0, arg1);\n    return ret;\n  };\n  imports.wbg.__wbindgen_throw = function (arg0, arg1) {\n    throw new Error(getStringFromWasm0(arg0, arg1));\n  };\n  return imports;\n}\nfunction __wbg_init_memory(imports, memory) {}\nfunction __wbg_finalize_init(instance, module) {\n  wasm = instance.exports;\n  __wbg_init.__wbindgen_wasm_module = module;\n  cachedDataViewMemory0 = null;\n  cachedUint8ArrayMemory0 = null;\n  wasm.__wbindgen_start();\n  return wasm;\n}\nfunction initSync(module) {\n  if (wasm !== undefined) return wasm;\n  if (typeof module !== 'undefined') {\n    if (Object.getPrototypeOf(module) === Object.prototype) {\n      ({\n        module\n      } = module);\n    } else {\n      console.warn('using deprecated parameters for `initSync()`; pass a single object instead');\n    }\n  }\n  const imports = __wbg_get_imports();\n  __wbg_init_memory(imports);\n  if (!(module instanceof WebAssembly.Module)) {\n    module = new WebAssembly.Module(module);\n  }\n  const instance = new WebAssembly.Instance(module, imports);\n  return __wbg_finalize_init(instance, module);\n}\nasync function __wbg_init(module_or_path) {\n  if (wasm !== undefined) return wasm;\n  if (typeof module_or_path !== 'undefined') {\n    if (Object.getPrototypeOf(module_or_path) === Object.prototype) {\n      ({\n        module_or_path\n      } = module_or_path);\n    } else {\n      console.warn('using deprecated parameters for the initialization function; pass a single object instead');\n    }\n  }\n  if (typeof module_or_path === 'undefined') {\n    module_or_path = new URL(/* asset import */ __webpack_require__(/*! rust_bg.wasm */ \"../rust/pkg/rust_bg.wasm\"), __webpack_require__.b);\n  }\n  const imports = __wbg_get_imports();\n  if (typeof module_or_path === 'string' || typeof Request === 'function' && module_or_path instanceof Request || typeof URL === 'function' && module_or_path instanceof URL) {\n    module_or_path = fetch(module_or_path);\n  }\n  __wbg_init_memory(imports);\n  const {\n    instance,\n    module\n  } = await __wbg_load(await module_or_path, imports);\n  return __wbg_finalize_init(instance, module);\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__wbg_init);\n\n//# sourceURL=webpack://skiigame/../rust/pkg/rust.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _rust_pkg_rust_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../rust/pkg/rust.js */ \"../rust/pkg/rust.js\");\n\nconst canvas = document.getElementById(\"gameCanvas\");\nlet wrapper = document.getElementById(\"wrapper\");\nlet gameOverSign = document.getElementById(\"gameOverSign\");\nconst scoreDisplay = document.getElementById(\"score\");\nlet distance;\nif (window.innerWidth < 500) {\n  canvas.width = window.innerWidth;\n  canvas.height = window.innerHeight;\n  distance = 30;\n} else {\n  canvas.width = window.innerWidth * 0.5;\n  canvas.height = window.innerHeight * 0.8;\n  distance = 0;\n}\nconst ctx = canvas.getContext(\"2d\");\nconst width = canvas.width;\nconst height = canvas.height;\nconst restartBtn = document.getElementById(\"restart\");\nconst pressedKeys = new Set();\nconst intervals = new Map();\nconst img = new Image();\nconst sideWayTree = new Image();\nsideWayTree.src = \"./SideWayTree.png\";\nimg.src = \"./tree.png\";\nlet images = [img, sideWayTree];\nlet game;\nlet cur_cunk = 1;\nlet draw = (x, y) => {\n  ctx.drawImage(images[0], x - 12, y + 10 + distance, 50, 110);\n};\nlet drawSideWayTree = (x, y) => {\n  ctx.drawImage(images[1], x - 45, y - 120 + distance, 100, 250);\n};\nlet distance_between_skiis_x;\nlet distance_between_skiis_y;\nlet x_offset_of_ligtning;\nfunction drawBody(x, y, width, height, radius) {\n  ctx.beginPath();\n  ctx.moveTo(x + radius, y); // Початок зверху зліва (з урахуванням радіуса)\n  ctx.lineTo(x + width - radius, y); // Верхня сторона\n  ctx.quadraticCurveTo(x + width, y, x + width, y + radius); // Правий верхній кут\n  ctx.lineTo(x + width, y + height - radius); // Права сторона\n  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height); // Правий нижній кут\n  ctx.lineTo(x + radius, y + height); // Нижня сторона\n  ctx.quadraticCurveTo(x, y + height, x, y + height - radius); // Лівий нижній кут\n  ctx.lineTo(x, y + radius); // Ліва сторона\n  ctx.quadraticCurveTo(x, y, x + radius, y); // Лівий верхній кут\n  ctx.closePath();\n  ctx.fill();\n}\nfunction drawSkier(ctx, x, y, rotation) {\n  const radians = (rotation + 90) * -1 * (Math.PI / 180);\n  distance_between_skiis_x = (90 - Math.abs(rotation)) / 6;\n  distance_between_skiis_y = rotation / 15;\n  x_offset_of_ligtning = 10 + rotation / 11.25;\n  ctx.save();\n  ctx.translate(x, y);\n  ctx.save();\n  ctx.rotate(radians);\n  ctx.fillStyle = \"black\";\n  let additionalOffset = rotation < 0 ? rotation / -3.5 : 0;\n  ctx.fillRect(-35 + distance_between_skiis_y + additionalOffset, 2, 30, 4);\n  ctx.fillRect(-35 + distance_between_skiis_y * -1 + additionalOffset, distance_between_skiis_x, 30, 4);\n  ctx.restore();\n  // Малюємо тулуб\n  ctx.fillStyle = \"#b3030f\";\n  drawBody(0, -5, 20, 25, 10);\n  ctx.fillStyle = \"#f5f0ec\";\n  ctx.fillRect(x_offset_of_ligtning, -5, 2, 22);\n  ctx.beginPath();\n  ctx.fillStyle = \"#d8cf89\";\n  ctx.arc(10, -10, 10, 0, Math.PI * 2, true);\n  ctx.fill();\n  ctx.closePath();\n  ctx.beginPath();\n  ctx.fillStyle = \"#b3030f\";\n  ctx.arc(10, -10, 10, 0, Math.PI, true);\n  ctx.fill();\n  ctx.closePath();\n  ctx.beginPath();\n  ctx.fillStyle = \"#f5f0ec\";\n  ctx.arc(10, -20, 3, 0, Math.PI * 2, true);\n  ctx.fill();\n  ctx.closePath();\n  ctx.restore();\n}\nfunction drawtrees(trees, player_y) {\n  trees.sort((a, b) => a.y - b.y).forEach(tree => {\n    if (tree.x > width * 0.2 && tree.x < width * 0.8) {\n      draw(tree.x, tree.y - player_y + 10);\n    } else {\n      drawSideWayTree(tree.x, tree.y - player_y + 10);\n    }\n  });\n}\nconst shadowDistance = 110 + distance;\nfunction drawShadow(trees, player_y) {\n  trees.forEach(tree => {\n    if (tree.x > width * 0.2 && tree.x < width * 0.8) ctx.fillRect(tree.x - 4, tree.y - player_y + shadowDistance, 45, 60);else {\n      ctx.fillRect(tree.x - 18, tree.y - player_y + shadowDistance, 70, 150);\n    }\n  });\n}\nfunction drawTraces(player_y) {\n  let traces = game.get_all_traces_for_js();\n  if (traces.length < 2) return; // Якщо точок недостатньо, нічого не малюємо\n\n  // Малювання першої кривої (ліва лінія)\n  ctx.beginPath();\n  ctx.moveTo(traces[0].x + 5, traces[0].y - player_y + height * 0.205); // Початкова точка\n  for (let i = 1; i < traces.length - 1; i++) {\n    const cpX = (traces[i].x + traces[i + 1].x) / 2 + 5; // Середина між двома точками\n    const cpY = (traces[i].y + traces[i + 1].y) / 2 - player_y + height * 0.205;\n    ctx.quadraticCurveTo(traces[i].x + 5, traces[i].y - player_y + height * 0.205, cpX, cpY);\n  }\n  ctx.lineTo(traces[traces.length - 1].x + 5, traces[traces.length - 1].y - player_y + height * 0.205);\n  ctx.strokeStyle = \"#95b1df\";\n  ctx.lineWidth = 4;\n  ctx.stroke();\n\n  // Малювання другої кривої (права лінія)\n  ctx.beginPath();\n  ctx.moveTo(traces[0].x + 15, traces[0].y - player_y + height * 0.205); // Початкова точка\n  for (let i = 1; i < traces.length - 1; i++) {\n    const cpX = (traces[i].x + traces[i + 1].x) / 2 + 15; // Середина між двома точками\n    const cpY = (traces[i].y + traces[i + 1].y) / 2 - player_y + height * 0.205;\n    ctx.quadraticCurveTo(traces[i].x + 15, traces[i].y - player_y + height * 0.205, cpX, cpY);\n  }\n  ctx.lineTo(traces[traces.length - 1].x + 15, traces[traces.length - 1].y - player_y + height * 0.205);\n  ctx.strokeStyle = \"#95b1df\";\n  ctx.lineWidth = 4;\n  ctx.stroke();\n}\nlet mode = Math.floor(width / 50);\nasync function run() {\n  try {\n    await (0,_rust_pkg_rust_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n    game = _rust_pkg_rust_js__WEBPACK_IMPORTED_MODULE_0__.Game.new(height, width, mode);\n    game.generate_chunk(0);\n    cur_cunk = 10;\n    let trees = game.get_all_trees_for_js();\n    function map(value, canvasWidth) {\n      const minRotation = -50;\n      const maxRotation = 50;\n      const normalizedValue = value / canvasWidth * 2 - 1;\n      return Math.max(minRotation, Math.min(maxRotation, normalizedValue * maxRotation));\n    }\n    function startAction(key, direction) {\n      if (intervals.has(key)) return;\n      game.btn_change_rotation(direction);\n      const interval = setInterval(() => {\n        game.btn_change_rotation(direction);\n      }, 13);\n      intervals.set(key, interval);\n    }\n    function stopAction(key) {\n      if (intervals.has(key)) {\n        clearInterval(intervals.get(key));\n        intervals.delete(key);\n      }\n    }\n    window.addEventListener(\"keydown\", event => {\n      const key = event.key;\n      if (!pressedKeys.has(key)) {\n        pressedKeys.add(key);\n        if (key === \"ArrowLeft\") {\n          startAction(key, -1);\n        } else if (key === \"ArrowRight\") {\n          startAction(key, 1);\n        }\n      }\n    });\n    window.addEventListener(\"keyup\", event => {\n      const key = event.key;\n      pressedKeys.delete(key);\n      stopAction(key);\n    });\n    canvas.addEventListener(\"mousemove\", event => {\n      const rect = canvas.getBoundingClientRect();\n      const mouseX = event.clientX - rect.left;\n      const rotation = map(mouseX, rect.width);\n      game.change_player_rotation(rotation);\n    });\n    canvas.addEventListener(\"touchmove\", event => {\n      event.preventDefault();\n      const rect = canvas.getBoundingClientRect();\n      const touchX = event.touches[0].clientX - rect.left;\n      const rotation = map(touchX, rect.width);\n      game.change_player_rotation(rotation);\n    });\n    restartBtn.addEventListener(\"click\", () => {\n      gameOverSign.style.display = \"none\";\n      game.restart();\n      gameLoop();\n    });\n    function gameLoop() {\n      let player_y = game.get_player_y();\n      const req_cur_chunk = game.get_current_chunk();\n      if (req_cur_chunk !== cur_cunk && player_y % height > height * 0.5) {\n        trees = game.get_all_trees_for_js();\n        cur_cunk = req_cur_chunk;\n      }\n      try {\n        game.update();\n        if (game.get_is_game_over()) {\n          gameOverSign.style.display = \"flex\";\n          return;\n        }\n        ctx.fillStyle = \"#95b1df\";\n        ctx.clearRect(0, 0, width, height);\n        drawShadow(trees, player_y);\n        drawTraces(player_y);\n        drawSkier(ctx, game.get_player_x(), height * 0.2, game.get_player_rotation());\n        drawtrees(trees, player_y);\n        scoreDisplay.textContent = \"Score: \" + Math.floor(game.get_player_y());\n        requestAnimationFrame(gameLoop);\n      } catch (error) {\n        console.error(\"Error during game loop:\", error);\n      }\n    }\n    gameLoop();\n  } catch (error) {\n    console.error(error);\n  }\n}\nrun();\n\n//# sourceURL=webpack://skiigame/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;