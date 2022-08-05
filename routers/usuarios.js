import {Router} from "express"
import { usuariosGetBuscar, usuariosGetBuscarid, usuariosGetBuscarNoE, usuariosGetBuscartelefono, usuariosGetlogin, usuariosPost, usuariosPutEditar, } from "../controllers/usuarios.js"

import { check } from "express-validator";
import helpersUsuarios from "../helpers/usuarios.js";
import validarExistaArchivo from "../middlewares/validar-exita-archivo.js";
import { validarCampos } from "../middlewares/validar-campos.js";


import { validarJWT } from "../middlewares/validar-jwt.js";
const router = Router();



router.get("/buscarid/:id",[
    check('id').isMongoId(),
    validarCampos
],usuariosGetBuscarid)

// router.put("/",usuariosfotoPut); 


// router.put("/inactivar/:id",[
//     check('id').isMongoId(),
//     validarCampos

// ],personasPutInactivar); 
// router.put("/activar/:id",[
//     check('id').isMongoId(),
//     validarCampos
// ],personasPutActivar); 


router.put("/editar/:id",[
    check('id').isMongoId(),
    validarCampos,validarJWT
],usuariosPutEditar);


router.post("/login",[
    check('email',"el email es obligatorio").isEmail(),
    check('password',"la contraseña es obligatoria").not().isEmpty(),
    validarCampos
],usuariosGetlogin);

router.get("/tel",usuariosGetBuscartelefono);

router.get("/b",usuariosGetBuscar);

router.get("/NoE",usuariosGetBuscarNoE);


//editar ususario
router.put("/editar/:id",[
    validarJWT,
    check('id').isMongoId(),
    validarCampos,
    validarExistaArchivo
],usuariosPutEditar),





router.post("/insertarUsuario",[
    check('nombre',"El nombre es obligatoro").not().isEmpty(),
    check('direccion').not().isEmpty(),
    check('numDocumento').not().isEmpty(),
    check('nombre',"Debe tener menos de 25 caracteres").isLength({max:25}),
    check('password',"Es Obligatorio").not().isEmpty(),
    check('password',"Debe tener más de 8 caracteres").isLength({min:8}),
    check('email',"Es Obligatorio").not().isEmpty(),
    check('email',"No es un email valido").isEmail(),
    check('email').custom(helpersUsuarios.existeEmail),
    check("numDocumento").custom(helpersUsuarios.existenumDocumento),
    validarCampos,
],usuariosPost);


export default router;