Componentes
- checkbox
- iconButton
- Menu app
- Modal
- Progress Bar
- select-form
- Button
- textField
- topbar
- upload file


utils
- Utils de conectividad donde se pueda detectar inestabilidad e indicar al usuario que tiene mala red de internet
- Manejo de errores, cuando ocurra un error en la app que se guarde localmente y luego se envia cuando tenga internet o despues
- 


Auth
- Manejo de autenticacion mediante huella para hacerlo mas facil y rapido



Tools
- tanstack query -> data fetchin, cache
- Axios -> interceptores, retries, estandar de errores
- zod -> validaciones tipadas
- Expo Sqlite + drizlle = localFirst
- Jest -> pruebas unitarias
- Maestro -> pruebas E2E


Estrategia de sync
- Optimistic UI (actualiza local primero, sync en background)
- Queue-based (todas las mutaciones van a una cola de sync)


Feature management
- firebase remote config
