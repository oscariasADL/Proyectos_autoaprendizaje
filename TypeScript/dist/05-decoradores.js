//Los decoradores son funciones que se pueden aplicar a clases, métodos, propiedades o parámetros
//para modificar su comportamiento o añadirles funcionalidades adicionales.
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
//Decorador basico
function DecoradorTurbo(target) {
    console.log("Decorador Turbo aplicado", target.name);
}
//@DecoradorTurbo
//Decorador con parametros
function DecoradorConParametros(parametro) {
    return function (target) {
        console.log("Decorador con parametro: ".concat(parametro), target.name);
    };
}
//@DecoradorConParametros("Mi Decorador Personalizado")
//Decorador de metodo
// Es un decorador que se aplica a un método de una clase
function agretarMetodo(target) {
    target.prototype.acelerar = function () {
        console.log("Acelerando el coche desde un metodo decorado");
    };
}
var Coche = function () {
    var _classDecorators = [agretarMetodo];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var Coche = _classThis = /** @class */ (function () {
        function Coche_1() {
            console.log("Coche creado");
        }
        return Coche_1;
    }());
    __setFunctionName(_classThis, "Coche");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Coche = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Coche = _classThis;
}();
var miCoche = new Coche(); // Al crear una instancia de Coche, se ejecuta el decorador y muestra "Coche creado"
miCoche.acelerar(); // Marca error al no existir el método acelerar en la instancia de Coche, se corrige con una interfaz extendida por el decorador
//Otra manera de corregir el error es:
//(miCoche as any).acelerar()
//let miCoche:any = new Coche();
