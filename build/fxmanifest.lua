fx_version 'cerulean'
game 'gta5'

author 'Maxence Leguede'
description 'TCS gamemode'
version '0.1.0'

resource_type 'gametype' { name = 'TCS' }

client_script '**/mixed_*.js'
client_script '**/cli_*.js'

server_script '**/mixed_*.js'
server_script '**/srv_*.js'

files {
	"src/assets/lang/**/*.json"
}