enum sqlTypes {
	// string data types
	CHAR = 'CHAR(255)',
	VARCHAR = 'VARCHAR(255)',
	TINYTEXT = 'TINYTEXT(255)',
	TEXT = 'TEXT(65535)',
	MEDIUMTEXT = 'MEDIUMTEXT(16777215)',
	LONGTEXT = 'LONGTEXT(4294967295)',
	BINARY = 'BINARY(255)',
	VARBINARY = 'VARBINARY(255)',

	INT = 'INT',
	DECIMAL = 'DECIMAL(10, 3)',

	DATE = 'DATE',
	DATETIME = 'DATETIME',
	TIMESTAMP = 'TIMESTAMP ',
}

interface sqlColumn {
	column: String;
	type: sqlTypes;
}
