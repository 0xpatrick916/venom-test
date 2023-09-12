export const abi = {
	"ABI version": 2,
	"version": "2.2",
	"header": ["pubkey", "time", "expire"],
	"functions": [
		{
			"name": "constructor",
			"inputs": [
				{"name":"managerPublicKey","type":"uint256"},
				{"name":"sendRemainingGasTo","type":"address"}
			],
			"outputs": [
			]
		},
		{
			"name": "deployBallot",
			"inputs": [
				{"name":"owner","type":"address"},
				{"name":"sendRemainingGasTo","type":"address"}
			],
			"outputs": [
			]
		},
		{
			"name": "onBallotUsed",
			"inputs": [
				{"name":"owner","type":"address"},
				{"name":"sendRemainingGasTo","type":"address"},
				{"name":"accept","type":"bool"}
			],
			"outputs": [
			]
		},
		{
			"name": "getDetails",
			"inputs": [
			],
			"outputs": [
				{"name":"accepted","type":"uint32"},
				{"name":"rejected","type":"uint32"}
			]
		}
	],
	"data": [
		{"key":1,"name":"_nonce","type":"uint16"},
		{"key":2,"name":"_ballotCode","type":"cell"}
	],
	"events": [
		{
			"name": "NewBallot",
			"inputs": [
				{"name":"ballotAddress","type":"address"},
				{"name":"owner","type":"address"}
			],
			"outputs": [
			]
		}
	],
	"fields": [
		{"name":"_pubkey","type":"uint256"},
		{"name":"_timestamp","type":"uint64"},
		{"name":"_constructorFlag","type":"bool"},
		{"name":"_nonce","type":"uint16"},
		{"name":"_ballotCode","type":"cell"},
		{"name":"_managerPublicKey","type":"uint256"},
		{"name":"_acceptedCount","type":"uint32"},
		{"name":"_rejectedCount","type":"uint32"}
	]
} as const

