(function() {
	// Theme Handling
	const themeDropdown = document.querySelector('.theme-dropdown');
	const themeTrigger = document.querySelector('.theme-trigger');
	const themeTriggerIcon = document.querySelector('.theme-trigger-icon');
	const themeOptions = document.querySelectorAll('.theme-option');

	// Lang Handling
	const langDropdown = document.querySelector('.lang-dropdown');
	const langTrigger = document.querySelector('.lang-trigger');
	const langTriggerText = document.querySelector('.lang-trigger-text');
	const langOptions = document.querySelectorAll('.lang-option');

	const translations = {
		cs: {
			"header.theme": "Motiv",
			"header.github": "Zobrazit na GitHubu",
			"theme.auto": "Auto",
			"theme.light": "Světlý",
			"theme.dark": "Tmavý",
			"hero.badge": "PostgreSQL → DBML",
			"hero.subtitle": "Extraktor schématu databáze",
			"hero.description": "Exportujte celé schéma PostgreSQL do formátu DBML jediným příkazem. Čisté SQL, žádné externí závislosti.",
			"hero.github_btn": "Zobrazit na GitHubu",
			"hero.quickstart": "Rychlý start ↓",
			"terminal.comment": "# Export schématu do DBML",
			"terminal.success": "✓ Schéma úspěšně exportováno → schema.dbml",
			"about.title": "Co je pg_dbml?",
			"about.content": "pg_dbml je výkonný nástroj příkazového řádku navržený k introspekci schématu databáze PostgreSQL a exportu jeho kompletní struktury do formátu Database Markup Language (DBML). Toho dosahuje prováděním komplexních čistých SQL dotazů na systémové katalogy PostgreSQL, čímž zajišťuje <strong style=\"color:var(--pg-cyan)\" data-t=\"about.fidelity\">100% věrnost schématu</strong> bez nutnosti externích ovladačů nebo ORM.",
			"about.fidelity": "100% věrnost schématu",
			"ai.title": "💡 Proč používat DBML pro AI a LLM?",
			"ai.content": "Databázová schémata jsou složitá na zpracování. Přímé dotazování živé databáze může být pomalé, drahé a vyžaduje hlubokou znalost SQL. DBML tento problém řeší tím, že poskytuje čitelný, deklarativní a vysoce strukturovaný plán vašich dat.",
			"ai.benefit_title": "✦ Přínos pro AI",
			"ai.benefit_content": "Konzumací souboru DBML mohou velké jazykové modely (LLM) rychle a nákladově efektivně porozumět vašemu datovému modelu. Okamžitě pochopí vztahy, struktury tabulek a omezení, aniž by musely spouštět časově náročné dotazy na produkční databázi.",
			"features.title": "Klíčové funkce",
			"features.sql_title": "Čistá SQL introspekce",
			"features.sql_desc": "Logika je zcela obsažena v PostgreSQL dotazech — žádné externí závislosti.",
			"features.constraints_title": "Mapování omezení",
			"features.constraints_desc": "Detekuje primární klíče, unikátní omezení a vztahy cizích klíčů.",
			"features.indexes_title": "Přehled indexů",
			"features.indexes_desc": "Dokumentuje vlastní indexy a sloupce INCLUDE pro úplné pokrytí schématu.",
			"features.metadata_title": "Bohatost metadat",
			"features.metadata_desc": "Zahrnuje komentáře tabulek a sloupců, pokud jsou k dispozici.",
			"features.cli_title": "Řízeno CLI",
			"features.cli_desc": "Jednoduché, opakovatelné spouštění přes příkaz pg_dbml. Vhodné pro skripty a CI.",
			"install.title": "Instalace",
			"install.brew_title": "Homebrew (doporučeno)",
			"install.brew_desc": "Nejjednodušší způsob instalace na macOS a Linux. Automaticky řeší závislosti.",
			"install.manual_title": "Ruční instalace",
			"install.manual_desc": "Pro systémy bez Homebrew nebo pokud chcete mít kód pod kontrolou.",
			"install.step1": "Klonování repozitáře",
			"install.step2": "Povolení spuštění",
			"install.step3": "Symlink (volitelně)",
			"install.step3_desc": "Pro globální dostupnost:",
			"install.psql_note": "* Vyžaduje nainstalovaný <code>psql</code> v PATH.",
			"usage.title": "Použití a parametry",
			"usage.intro": "Nástroj <code>pg_dbml</code> můžete spouštět buď s jednotlivými parametry, nebo pomocí standardního PostgreSQL Connection URI.",
			"usage.basic_title": "Základní spuštění",
			"usage.basic_comment": "# Export podle názvu databáze (host: localhost)",
			"usage.uri_title": "Použití Connection URI",
			"usage.uri_comment": "# Export pomocí úplné adresy",
			"usage.dryrun_title": "Náhled (dry-run)",
			"usage.dryrun_comment": "# Náhled bez zápisu do souboru",
			"usage.params_title": "Přehled parametrů",
			"table.param": "Parametr",
			"table.short": "Zkratka",
			"table.desc": "Popis",
			"table.default": "Výchozí",
			"params.dbname": "Název cílové databáze.",
			"params.host": "Adresa PostgreSQL serveru.",
			"params.port": "Port serveru.",
			"params.user": "Uživatelské jméno.",
			"params.output": "Cesta k výslednému souboru.",
			"params.quiet": "Potlačí výpis úspěchu.",
			"params.dryrun": "Náhled bez zápisu.",
			"params.version": "Zobrazí verzi skriptu.",
			"arch.title": "Technická architektura",
			"arch.intro": "Projekt je rozdělen do dvou klíčových částí pro maximální udržovatelnost a skvělý vývojářský zážitek:",
			"arch.bash_title": "pg_dbml (Bash orchestrátor)",
			"arch.bash_desc": "Zajišťuje parsování argumentů, bezpečné připojení k databázi přes <code>psql</code> a zápis streamu do souboru.",
			"arch.sql_title": "pg_dbml.sql (Jádro)",
			"arch.sql_desc": "Komplexní, čistě SQL dotaz nad systémovými tabulkami PostgreSQL. Díky oddělení v samostatném souboru těžíte z plného zvýraznění syntaxe a standardního SQL ladění.",
			"footer.authors": "Vytvořeno autory",
			"footer.license": "Licence MIT"
		},
		en: {
			"header.theme": "Theme",
			"header.github": "View on GitHub",
			"theme.auto": "Auto",
			"theme.light": "Light",
			"theme.dark": "Dark",
			"hero.badge": "PostgreSQL → DBML",
			"hero.subtitle": "Database Schema Extractor",
			"hero.description": "Export your entire PostgreSQL schema to DBML format with a single command. Pure SQL, zero external dependencies.",
			"hero.github_btn": "View on GitHub",
			"hero.quickstart": "Quick Start ↓",
			"terminal.comment": "# Export schema to DBML",
			"terminal.success": "✓ Schema successfully exported → schema.dbml",
			"about.title": "What is pg_dbml?",
			"about.content": "pg_dbml is a powerful command-line tool designed to introspect your PostgreSQL database schema and export its complete structure to Database Markup Language (DBML) format. It achieves this by executing complex, pure SQL queries against PostgreSQL system catalogs, ensuring <strong style=\"color:var(--pg-cyan)\" data-t=\"about.fidelity\">100% schema fidelity</strong> without needing external drivers or ORMs.",
			"about.fidelity": "100% schema fidelity",
			"ai.title": "💡 Why use DBML for AI & LLMs?",
			"ai.content": "Database schemas are often complex to parse. Querying a live database for schema knowledge is slow, resource-intensive, and requires intricate SQL expertise. DBML solves this by providing a human-readable, declarative, and highly structured blueprint of your data.",
			"ai.benefit_title": "✦ Benefit for AI",
			"ai.benefit_content": "By consuming a DBML file, large language models (LLMs) can rapidly and cost-effectively familiarize themselves with your data model. They can instantly understand relationships, table structures, and constraints without running time-consuming queries against the live database.",
			"features.title": "Key Features",
			"features.sql_title": "Pure SQL Introspection",
			"features.sql_desc": "The logic is entirely contained within PostgreSQL queries — no external dependencies.",
			"features.constraints_title": "Constraint Mapping",
			"features.constraints_desc": "Automatically detects and maps Primary Keys, Unique constraints, and Foreign Key relationships.",
			"features.indexes_title": "Index Overview",
			"features.indexes_desc": "Documents custom indexes and INCLUDE columns for full schema coverage.",
			"features.metadata_title": "Metadata Richness",
			"features.metadata_desc": "Includes table and column comments retrieved directly from PostgreSQL metadata.",
			"features.cli_title": "CLI Driven",
			"features.cli_desc": "Simple, repeatable execution via the pg_dbml command. Perfect for scripts and CI/CD.",
			"install.title": "Installation",
			"install.brew_title": "Homebrew (Recommended)",
			"install.brew_desc": "The easiest way to install on macOS and Linux. Automatically handles all dependencies.",
			"install.manual_title": "Manual Installation",
			"install.manual_desc": "For systems without Homebrew or if you prefer manual control.",
			"install.step1": "Clone the repository",
			"install.step2": "Make it executable",
			"install.step3": "Symlink (Optional)",
			"install.step3_desc": "For global availability:",
			"install.psql_note": "* Requires <code>psql</code> installed and available in your PATH.",
			"usage.title": "Usage & Parameters",
			"usage.intro": "You can run <code>pg_dbml</code> using individual parameters or a standard PostgreSQL Connection URI.",
			"usage.basic_title": "Basic Execution",
			"usage.basic_comment": "# Export by database name (host: localhost)",
"usage.uri_title": "Using Connection URI",
			"usage.uri_comment": "# Export using full URI",
			"usage.dryrun_title": "Preview (dry-run)",
			"usage.dryrun_comment": "# Preview output without writing file",
			"usage.params_title": "Parameters Overview",
			"table.param": "Parameter",
			"table.short": "Short",
			"table.desc": "Description",
			"table.default": "Default",
			"params.dbname": "Name of the target database.",
			"params.host": "PostgreSQL host address.",
			"params.port": "PostgreSQL port.",
			"params.user": "Database user name.",
			"params.output": "Path where the .dbml file will be saved.",
			"params.quiet": "Suppress success message.",
			"params.dryrun": "Preview output without writing file.",
			"params.version": "Show script version.",
			"arch.title": "Technical Architecture",
			"arch.intro": "The project is split into two parts to maximize developer experience and maintainability:",
			"arch.bash_title": "pg_dbml (Bash orchestrator)",
			"arch.bash_desc": "Parses arguments, handles database connections via <code>psql</code>, and writes the output.",
			"arch.sql_title": "pg_dbml.sql (Core Engine)",
			"arch.sql_desc": "A complex, pure SQL query. Keeping it separate allows for full syntax highlighting and standard SQL debugging.",
			"footer.authors": "Created by the authors of",
			"footer.license": "MIT License"
		},
		es: {
			"header.theme": "Tema",
			"header.github": "Ver en GitHub",
			"theme.auto": "Auto",
			"theme.light": "Claro",
			"theme.dark": "Oscuro",
			"hero.badge": "PostgreSQL → DBML",
			"hero.subtitle": "Extractor de esquemas de bases de datos",
			"hero.description": "Exporta todo tu esquema PostgreSQL a formato DBML con un solo comando. SQL puro, sin dependencias externas.",
			"hero.github_btn": "Ver en GitHub",
			"hero.quickstart": "Inicio rápido ↓",
			"terminal.comment": "# Exportar esquema a DBML",
			"terminal.success": "✓ Esquema exportado con éxito → schema.dbml",
			"about.title": "¿Qué es pg_dbml?",
			"about.content": "pg_dbml es una potente herramienta de línea de comandos diseñada para introspeccionar el esquema de su base de datos PostgreSQL y exportar su estructura completa al formato Database Markup Language (DBML). Lo logra ejecutando consultas SQL puras y complejas contra los catálogos del sistema PostgreSQL, asegurando una <strong style=\"color:var(--pg-cyan)\" data-t=\"about.fidelity\">100% fidelidad del esquema</strong> sin necesidad de controladores externos u ORM.",
			"about.fidelity": "100% fidelidad del esquema",
			"ai.title": "💡 ¿Por qué usar DBML para IA y LLMs?",
			"ai.content": "Los esquemas de bases de datos suelen ser complejos de analizar. Consultar una base de datos en vivo para obtener conocimientos del esquema es lento, requiere muchos recursos y exige una intrincada experiencia en SQL. DBML resuelve esto proporcionando un plano de sus datos legible por humanos, declarativo y altamente estructurado.",
			"ai.benefit_title": "✦ Beneficio para la IA",
			"ai.benefit_content": "Al consumir un archivo DBML, los modelos de lenguaje grandes (LLM) pueden familiarizarse rápida y económicamente con su modelo de datos. Pueden comprender instantáneamente las relaciones, las estructuras de las tablas y las restricciones sin ejecutar consultas lentas contra la base de datos en vivo.",
			"features.title": "Características principales",
			"features.sql_title": "Introspección SQL pura",
			"features.sql_desc": "La lógica está contenida completamente en consultas PostgreSQL — sin dependencias externas.",
			"features.constraints_title": "Mapeo de restricciones",
			"features.constraints_desc": "Detecta automáticamente y mapea claves primarias, restricciones de unicidad y relaciones de claves foráneas.",
			"features.indexes_title": "Resumen de índices",
			"features.indexes_desc": "Documenta índices personalizados y columnas INCLUDE para una cobertura completa del esquema.",
			"features.metadata_title": "Riqueza de metadatos",
			"features.metadata_desc": "Incluye comentarios de tablas y columnas recuperados directamente de los metadatos de PostgreSQL.",
			"features.cli_title": "Controlado por CLI",
			"features.cli_desc": "Ejecución sencilla y repetible mediante el comando pg_dbml. Ideal para scripts y CI/CD.",
			"install.title": "Instalación",
			"install.brew_title": "Homebrew (Recomendado)",
			"install.brew_desc": "La forma más fácil de instalar en macOS y Linux. Maneja automáticamente todas las dependencias.",
			"install.manual_title": "Instalación manual",
			"install.manual_desc": "Para sistemas sin Homebrew o si prefiere el control manual.",
			"install.step1": "Clonar el repositorio",
			"install.step2": "Hacerlo ejecutable",
			"install.step3": "Enlace simbólico (opcional)",
			"install.step3_desc": "Para disponibilidad global:",
			"install.psql_note": "* Requiere <code>psql</code> instalado y disponible en su PATH.",
			"usage.title": "Uso y parámetros",
			"usage.intro": "Puede ejecutar <code>pg_dbml</code> utilizando parámetros individuales o un URI de conexión estándar de PostgreSQL.",
			"usage.basic_title": "Ejecución básica",
			"usage.basic_comment": "# Exportar por nombre de base de datos (host: localhost)",
			"usage.uri_title": "Uso de Connection URI",
			"usage.uri_comment": "# Exportar usando la cadena de conexión completa",
			"usage.dryrun_title": "Vista previa (dry-run)",
			"usage.dryrun_comment": "# Vista previa sin escribir archivo",
			"usage.params_title": "Referencia de argumentos",
			"table.param": "Parámetro",
			"table.short": "Abrev.",
			"table.desc": "Descripción",
			"table.default": "Predeter.",
			"params.dbname": "Nombre de la base de datos de destino.",
			"params.host": "Dirección del host PostgreSQL.",
			"params.port": "Puerto PostgreSQL.",
			"params.user": "Nombre de usuario de la base de datos.",
			"params.output": "Ruta donde se guardará el archivo .dbml.",
			"params.quiet": "Suprime el mensaje de éxito.",
			"params.dryrun": "Vista previa sin escribir archivo.",
			"params.version": "Mostrar versión del script.",
			"arch.title": "Arquitectura técnica",
			"arch.intro": "El proyecto se divide en dos partes para maximizar la experiencia del desarrollador y el mantenimiento:",
			"arch.bash_title": "pg_dbml (Orquestador Bash)",
			"arch.bash_desc": "Analiza los argumentos, maneja las conexiones a la base de datos vía <code>psql</code> y escribe la salida.",
			"arch.sql_title": "pg_dbml.sql (Núcleo)",
			"arch.sql_desc": "Una consulta SQL pura y compleja. Mantenerlo separado permite el resaltado completo de sintaxis y la depuración SQL estándar.",
			"footer.authors": "Creado por los autores de",
			"footer.license": "Licencia MIT"
		},
		fr: {
			"header.theme": "Thème",
			"header.github": "Voir sur GitHub",
			"theme.auto": "Auto",
			"theme.light": "Clair",
			"theme.dark": "Sombre",
			"hero.badge": "PostgreSQL → DBML",
			"hero.subtitle": "Extracteur de schéma de base de données",
			"hero.description": "Exportez tout votre schéma PostgreSQL au format DBML avec une seule commande. SQL pur, zéro dépendance externe.",
			"hero.github_btn": "Voir sur GitHub",
			"hero.quickstart": "Démarrage rapide ↓",
			"terminal.comment": "# Exporter le schéma en DBML",
			"terminal.success": "✓ Schéma exporté avec succès → schema.dbml",
			"about.title": "Qu'est-ce que pg_dbml ?",
			"about.content": "pg_dbml est un puissant outil CLI conçu pour introspecter votre schéma PostgreSQL et exporter sa structure complète au format DBML. Il exécute des requêtes SQL pures contre les catalogues système de PostgreSQL, garantissant une <strong style=\"color:var(--pg-cyan)\" data-t=\"about.fidelity\">fidélité du schéma de 100%</strong> sans pilotes externes.",
			"about.fidelity": "100% de fidélité du schéma",
			"ai.title": "💡 Pourquoi DBML pour l'IA et LLM ?",
			"ai.content": "Les schémas de bases de données sont complexes à traiter. DBML résout ce problème en fournissant un plan lisible, déclaratif et structuré de vos données.",
			"ai.benefit_title": "✦ Bénéfice pour l'IA",
			"ai.benefit_content": "En consommant un fichier DBML, les LLM peuvent comprendre rapidement et à moindre coût votre modèle de données sans requêtes lourdes sur la base de production.",
			"features.title": "Fonctionnalités clés",
			"features.sql_title": "Introspection SQL pure",
			"features.sql_desc": "Toute la logique est dans les requêtes PostgreSQL — aucune dépendance externe.",
			"features.constraints_title": "Mappage des contraintes",
			"features.constraints_desc": "Détecte les clés primaires, contraintes uniques et relations étrangères.",
			"features.indexes_title": "Aperçu des index",
			"features.indexes_desc": "Documente les index personnalisés et les colonnes INCLUDE.",
			"features.metadata_title": "Métadonnées riches",
			"features.metadata_desc": "Inclut les commentaires des tables et des colonnes.",
			"features.cli_title": "Piloté par CLI",
			"features.cli_desc": "Exécution simple et répétable via la commande pg_dbml. Idéal pour les scripts et la CI.",
			"install.title": "Installation",
			"install.brew_title": "Homebrew (recommandé)",
			"install.brew_desc": "Le moyen le plus simple sur macOS et Linux. Gère les dépendances automatiquement.",
			"install.manual_title": "Installation manuelle",
			"install.manual_desc": "Pour les systèmes sans Homebrew ou pour garder le contrôle sur le code.",
			"install.step1": "Cloner le dépôt",
			"install.step2": "Autoriser l'exécution",
			"install.step3": "Lien symbolique (facultatif)",
			"install.step3_desc": "Pour une disponibilité globale :",
			"install.psql_note": "* Nécessite <code>psql</code> dans votre PATH.",
			"usage.title": "Utilisation et paramètres",
			"usage.intro": "Exécutez <code>pg_dbml</code> avec des paramètres individuels ou une URI de connexion PostgreSQL.",
			"usage.basic_title": "Exécution de base",
			"usage.basic_comment": "# Export par nom de base (host: localhost)",
			"usage.uri_title": "Utilisation de l'URI de connexion",
			"usage.uri_comment": "# Export via l'adresse complète",
			"usage.dryrun_title": "Aperçu (dry-run)",
			"usage.dryrun_comment": "# Aperçu sans écrire le fichier",
			"usage.params_title": "Référence des paramètres",
			"table.param": "Paramètre",
			"table.short": "Court",
			"table.desc": "Description",
			"table.default": "Défaut",
			"params.dbname": "Nom de la base de données cible.",
			"params.host": "Adresse du serveur PostgreSQL.",
			"params.port": "Port du serveur.",
			"params.user": "Nom d'utilisateur.",
			"params.output": "Chemin du fichier de sortie.",
			"params.quiet": "Suppresse le message de succès.",
			"params.dryrun": "Aperçu sans écrire le fichier.",
			"params.version": "Affiche la version du script.",
			"arch.title": "Architecture technique",
			"arch.intro": "Le projet est divisé en deux parties pour la maintenabilité :",
			"arch.bash_title": "pg_dbml (orchestrateur Bash)",
			"arch.bash_desc": "Gère les arguments, la connexion via <code>psql</code> et l'écriture du flux.",
			"arch.sql_title": "pg_dbml.sql (noyer)",
			"arch.sql_desc": "Requête SQL pure sur les tables système. Profite de la coloration syntaxique standard.",
			"footer.authors": "Créé par les auteurs de",
			"footer.license": "Licence MIT"
		},
		de: {
			"header.theme": "Thema",
			"header.github": "Auf GitHub ansehen",
			"theme.auto": "Auto",
			"theme.light": "Hell",
			"theme.dark": "Dunkel",
			"hero.badge": "PostgreSQL → DBML",
			"hero.subtitle": "Datenbank-Schema-Extraktor",
			"hero.description": "Exportieren Sie Ihr komplettes PostgreSQL-Schema mit einem einzigen Befehl in das DBML-Format. Reines SQL, keine externen Abhängigkeiten.",
			"hero.github_btn": "Auf GitHub ansehen",
			"hero.quickstart": "Schnellstart ↓",
			"terminal.comment": "# Schema nach DBML exportieren",
			"terminal.success": "✓ Schema erfolgreich exportiert → schema.dbml",
			"about.title": "Was ist pg_dbml?",
			"about.content": "pg_dbml ist ein leistungsstarkes CLI-Tool zur Introspektion Ihres PostgreSQL-Schemas und zum Export in das DBML-Format. Es führt komplexe reine SQL-Abfragen gegen Systemkataloge aus und garantiert <strong style=\"color:var(--pg-cyan)\" data-t=\"about.fidelity\">100% Schema-Treue</strong>.",
			"about.fidelity": "100% Schema-Treue",
			"ai.title": "💡 Warum DBML für KI und LLMs?",
			"ai.content": "Datenbankschemata sind komplex zu verarbeiten. DBML bietet eine lesbare, deklarative und strukturierte Blaupause Ihrer Daten.",
			"ai.benefit_title": "✦ Vorteil für KI",
			"ai.benefit_content": "Durch das Einlesen einer DBML-Datei können LLMs Ihr Datenmodell schnell verstehen, ohne zeitintensive Abfragen an die Live-Datenbank zu stellen.",
			"features.title": "Hauptmerkmale",
			"features.sql_title": "Reine SQL-Introspektion",
			"features.sql_desc": "Die Logik ist vollständig in PostgreSQL-Abfragen enthalten — keine externen Abhängigkeiten.",
			"features.constraints_title": "Constraint-Mapping",
			"features.constraints_desc": "Erkennt Primärschlüssel, Unique Constraints und Fremdschlüsselbeziehungen.",
			"features.indexes_title": "Index-Übersicht",
			"features.indexes_desc": "Dokumentiert eigene Indizes und INCLUDE-Spalten.",
			"features.metadata_title": "Metadaten-Reichtum",
			"features.metadata_desc": "Enthält Tabellen- und Spaltenkommentare aus den Metadaten.",
			"features.cli_title": "CLI-gesteuert",
			"features.cli_desc": "Einfache, wiederholbare Ausführung über den pg_dbml-Befehl. Ideal für Skripte und CI.",
			"install.title": "Installation",
			"install.brew_title": "Homebrew (empfohlen)",
			"install.brew_desc": "Der einfachste Weg unter macOS und Linux. Löst Abhängigkeiten automatisch auf.",
			"install.manual_title": "Manuelle Installation",
			"install.manual_desc": "Für Systeme ohne Homebrew oder wenn Sie die Kontrolle über den Code behalten wollen.",
			"install.step1": "Repository klonen",
			"install.step2": "Ausführung erlauben",
			"install.step3": "Symlink (optional)",
			"install.step3_desc": "Für globale Verfügbarkeit:",
			"install.psql_note": "* Erfordert <code>psql</code> in Ihrem PATH.",
			"usage.title": "Verwendung & Parameter",
			"usage.intro": "Führen Sie <code>pg_dbml</code> mit einzelnen Parametern oder einer PostgreSQL-Connection-URI aus.",
			"usage.basic_title": "Basisausführung",
			"usage.basic_comment": "# Export nach Datenbankname (Host: localhost)",
			"usage.uri_title": "Connection-URI verwenden",
			"usage.uri_comment": "# Export über vollständige Adresse",
			"usage.dryrun_title": "Vorschau (dry-run)",
			"usage.dryrun_comment": "# Vorschau ohne Dateischreiben",
			"usage.params_title": "Argument-Referenz",
			"table.param": "Parameter",
			"table.short": "Kurz",
			"table.desc": "Beschreibung",
			"table.default": "Standard",
			"params.dbname": "Name der Zieldatenbank.",
			"params.host": "Adresse des PostgreSQL-Servers.",
			"params.port": "Port des Servers.",
			"params.user": "Benutzername.",
			"params.output": "Pfad zur Ausgabedatei.",
			"params.quiet": "Unterdrückt die Erfolgsmeldung.",
			"params.dryrun": "Vorschau ohne Dateischreiben.",
			"params.version": "Zeigt die Skriptversion an.",
			"arch.title": "Technische Architektur",
			"arch.intro": "Das Projekt ist für die Wartbarkeit in zwei Teile unterteilt:",
			"arch.bash_title": "pg_dbml (Bash-Orchestrator)",
			"arch.bash_desc": "Übernimmt das Parsen der Argumente, die Verbindung über <code>psql</code> und das Schreiben des Streams.",
			"arch.sql_title": "pg_dbml.sql (Kern)",
			"arch.sql_desc": "Komplexe SQL-Abfrage über Systemtabellen. Profitiert von Standard-Syntax-Highlighting.",
			"footer.authors": "Erstellt von den Autoren von",
			"footer.license": "MIT-Lizenz"
		},
		it: {
			"header.theme": "Tema",
			"header.github": "Vedi su GitHub",
			"theme.auto": "Auto",
			"theme.light": "Chiaro",
			"theme.dark": "Scuro",
			"hero.badge": "PostgreSQL → DBML",
			"hero.subtitle": "Estrattore di schema del database",
			"hero.description": "Esporta l'intero schema PostgreSQL in formato DBML con un singolo comando. SQL puro, zero dipendenze esterne.",
			"hero.github_btn": "Vedi su GitHub",
			"hero.quickstart": "Avvio rapido ↓",
			"terminal.comment": "# Esporta lo schema in DBML",
			"terminal.success": "✓ Schema esportato con successo → schema.dbml",
			"about.title": "Cos'è pg_dbml ?",
			"about.content": "pg_dbml è un potente strumento CLI progettato per esaminare il tuo schema PostgreSQL ed esportare la sua struttura completa in formato DBML. Esegue query SQL pure sui cataloghi di sistema di PostgreSQL, garantendo una <strong style=\"color:var(--pg-cyan)\" data-t=\"about.fidelity\">fedeltà dello schema al 100%</strong> senza driver esterni.",
			"about.fidelity": "100% fedeltà dello schema",
			"ai.title": "💡 Perché DBML per IA e LLM?",
			"ai.content": "Gli schemi dei database sono complessi da elaborare. DBML risolve questo problema fornendo un piano leggibile, dichiarativo e strutturato dei tuoi dati.",
			"ai.benefit_title": "✦ Vantaggio per l'IA",
			"ai.benefit_content": "Utilizzando un file DBML, i modelli LLM possono comprendere rapidamente il tuo modello di dati senza appesantire il database di produzione.",
			"features.title": "Caratteristiche principali",
			"features.sql_title": "Introspezione SQL pura",
			"features.sql_desc": "La logica è interamente contenuta nelle query PostgreSQL — nessuna dipendenza esterna.",
			"features.constraints_title": "Mappatura dei vincoli",
			"features.constraints_desc": "Rileva chiavi primarie, vincoli univoci e relazioni esterne.",
			"features.indexes_title": "Panoramica degli indici",
			"features.indexes_desc": "Documenta indici personalizzati e colonne INCLUDE.",
			"features.metadata_title": "Ricchezza di metadati",
			"features.metadata_desc": "Include i commenti di tabelle e colonne dai metadati.",
			"features.cli_title": "Gestito da CLI",
			"features.cli_desc": "Esecuzione semplice e ripetibile tramite il comando pg_dbml. Ideale per script e CI.",
			"install.title": "Installazione",
			"install.brew_title": "Homebrew (consigliato)",
			"install.brew_desc": "Il modo più semplice su macOS e Linux. Gestisce le dipendenze automaticamente.",
			"install.manual_title": "Installazione manuale",
			"install.manual_desc": "Per sistemi senza Homebrew o se preferisci avere il controllo sul codice.",
			"install.step1": "Clona il repository",
			"install.step2": "Autorizza l'esecuzione",
			"install.step3": "Link simbolico (opzionale)",
			"install.step3_desc": "Per la disponibilità globale:",
			"install.psql_note": "* Richiede <code>psql</code> nel tuo PATH.",
			"usage.title": "Utilizzo e parametri",
			"usage.intro": "Esegui <code>pg_dbml</code> con parametri individuali o un URI di connessione PostgreSQL.",
			"usage.basic_title": "Esecuzione di base",
			"usage.basic_comment": "# Esportazione per nome database (host: localhost)",
			"usage.uri_title": "Utilizzo di Connection URI",
			"usage.uri_comment": "# Esportazione tramite indirizzo completo",
			"usage.dryrun_title": "Anteprima (dry-run)",
			"usage.dryrun_comment": "# Anteprima senza scrivere file",
			"usage.params_title": "Riferimento parametri",
			"table.param": "Parametro",
			"table.short": "Corto",
			"table.desc": "Descrizione",
			"table.default": "Default",
			"params.dbname": "Nome del database di destinazione.",
			"params.host": "Indirizzo del server PostgreSQL.",
			"params.port": "Porta del server.",
			"params.user": "Nome utente.",
			"params.output": "Percorso del file di output.",
			"params.quiet": "Sopprime il messaggio di successo.",
			"params.dryrun": "Anteprima senza scrivere file.",
			"params.version": "Mostra la versione dello script.",
			"arch.title": "Architettura tecnica",
			"arch.intro": "Il progetto è diviso in due parti per la manutenibilità:",
			"arch.bash_title": "pg_dbml (orchestratore Bash)",
			"arch.bash_desc": "Gestisce il parsing degli argomenti, la connessione tramite <code>psql</code> e la scrittura dell'output.",
			"arch.sql_title": "pg_dbml.sql (Core)",
			"arch.sql_desc": "Query SQL pura sulle tabelle di sistema. Sfrutta l'evidenziazione della sintassi standard.",
			"footer.authors": "Creato dagli autori di",
			"footer.license": "Licenza MIT"
		},
		pt: {
			"header.theme": "Tema",
			"header.github": "Ver no GitHub",
			"theme.auto": "Auto",
			"theme.light": "Claro",
			"theme.dark": "Escuro",
			"hero.badge": "PostgreSQL → DBML",
			"hero.subtitle": "Extrator de esquema de banco de dados",
			"hero.description": "Exporte todo o seu esquema PostgreSQL para o formato DBML com um único comando. SQL puro, sem dependências externas.",
			"hero.github_btn": "Ver no GitHub",
			"hero.quickstart": "Início rápido ↓",
			"terminal.comment": "# Exportar esquema para DBML",
			"terminal.success": "✓ Esquema exportado com sucesso → schema.dbml",
			"about.title": "O que é pg_dbml ?",
			"about.content": "pg_dbml é uma poderosa ferramenta CLI projetada para introspecção do seu esquema PostgreSQL e exportação para o formato DBML. Executa consultas SQL puras nos catálogos de sistema do PostgreSQL, garantindo <strong style=\"color:var(--pg-cyan)\" data-t=\"about.fidelity\">100% de fidelidade do esquema</strong> sem drivers externos.",
			"about.fidelity": "100% de fidelidade do esquema",
			"ai.title": "💡 Por que DBML para IA e LLMs?",
			"ai.content": "Esquemas de bancos de dados são complexos de processar. O DBML resolve isso fornecendo um plano legível, declarativo e estruturado dos seus dados.",
			"ai.benefit_title": "✦ Benefício para IA",
			"ai.benefit_content": "Ao consumir um arquivo DBML, os LLMs podem entender rapidamente seu modelo de dados sem sobrecarregar o banco de dados de produção.",
			"features.title": "Recursos principais",
			"features.sql_title": "Introspecção SQL pura",
			"features.sql_desc": "Toda a lógica está nas consultas PostgreSQL — sem dependências externas.",
			"features.constraints_title": "Mapeamento de restrições",
			"features.constraints_desc": "Detecta chaves primárias, restrições exclusivas e relacionamentos externos.",
			"features.indexes_title": "Visão geral de índices",
			"features.indexes_desc": "Documenta índices personalizados e colunas INCLUDE.",
			"features.metadata_title": "Metadados ricos",
			"features.metadata_desc": "Inclui comentários de tabelas e colunas dos metadados.",
			"features.cli_title": "Controlado por CLI",
			"features.cli_desc": "Execução simples e repetível via comando pg_dbml. Ideal para scripts e CI.",
			"install.title": "Instalação",
			"install.brew_title": "Homebrew (recomendado)",
			"install.brew_desc": "A maneira mais fácil no macOS e Linux. Resolve dependências automaticamente.",
			"install.manual_title": "Instalação manual",
			"install.manual_desc": "Para sistemas sem Homebrew ou se preferir manter o controle sobre o código.",
			"install.step1": "Clonar o repositório",
			"install.step2": "Permitir execução",
			"install.step3": "Symlink (opcional)",
			"install.step3_desc": "Para disponibilidade global:",
			"install.psql_note": "* Requer <code>psql</code> em seu PATH.",
			"usage.title": "Uso e parâmetros",
			"usage.intro": "Execute <code>pg_dbml</code> com parâmetros individuais ou uma URI de conexão PostgreSQL.",
			"usage.basic_title": "Execução básica",
			"usage.basic_comment": "# Exportar por nome do banco (host: localhost)",
			"usage.uri_title": "Usar Connection URI",
			"usage.uri_comment": "# Exportar via endereço completo",
			"usage.dryrun_title": "Pré-visualização (dry-run)",
			"usage.dryrun_comment": "# Pré-visualização sem escrever arquivo",
			"usage.params_title": "Referência de parâmetros",
			"table.param": "Parâmetro",
			"table.short": "Curto",
			"table.desc": "Descrição",
			"table.default": "Padrão",
			"params.dbname": "Nome do banco de dados de destino.",
			"params.host": "Endereço do servidor PostgreSQL.",
			"params.port": "Porta do servidor.",
			"params.user": "Nome de usuário.",
			"params.output": "Caminho do arquivo de saída.",
			"params.quiet": "Suprime mensagem de sucesso.",
			"params.dryrun": "Pré-visualização sem escrever arquivo.",
			"params.version": "Mostra a versão do script.",
			"arch.title": "Arquitetura técnica",
			"arch.intro": "O projeto está dividido em duas partes para facilidade de manutenção:",
			"arch.bash_title": "pg_dbml (orquestrador Bash)",
			"arch.bash_desc": "Gerencia o parsing de argumentos, a conexão via <code>psql</code> e a escrita do stream.",
			"arch.sql_title": "pg_dbml.sql (Núcleo)",
			"arch.sql_desc": "Consulta SQL pura sobre tabelas de sistema. Beneficia-se de realce de sintaxe padrão.",
			"footer.authors": "Criado pelos autores de",
			"footer.license": "Licença MIT"
		}
	};

	const getStoredTheme = () => localStorage.getItem('pg_dbml_theme') || 'auto';
	const getStoredLang = () => localStorage.getItem('pg_dbml_lang') || 'auto';

	const applyTheme = (theme) => {
		if (theme === 'auto') {
			document.documentElement.removeAttribute('data-theme');
		} else {
			document.documentElement.setAttribute('data-theme', theme);
		}
		localStorage.setItem('pg_dbml_theme', theme);
		themeOptions.forEach(opt => opt.classList.toggle('active', opt.getAttribute('data-theme-value') === theme));
		if (themeDropdown) themeDropdown.classList.remove('open');
	};

	const applyLang = (lang) => {
		let targetLang = lang;
		if (lang === 'auto') {
			const n = navigator.languages || [navigator.language];
			for (let i = 0; i < n.length; i++) {
				const s = n[i].split('-')[0].toLowerCase();
				if (translations[s]) { targetLang = s; break; }
			}
			if (targetLang === 'auto') targetLang = 'en';
		}

		document.documentElement.setAttribute('lang', targetLang);
		localStorage.setItem('pg_dbml_lang', lang);

		// Update UI text
		document.querySelectorAll('[data-t]').forEach(el => {
			const key = el.getAttribute('data-t');
			if (translations[targetLang][key]) {
				el.innerHTML = translations[targetLang][key];
			}
		});

		langOptions.forEach(opt => opt.classList.toggle('active', opt.getAttribute('data-lang-value') === lang));
		if (langDropdown) langDropdown.classList.remove('open');
	};

	// Copy to Clipboard
	const setupCopyButtons = () => {
		const blocks = document.querySelectorAll('.code-block, .terminal');
		blocks.forEach(block => {
			// Add button to HTML if not present
			if (!block.querySelector('.copy-btn')) {
				const btn = document.createElement('button');
				btn.className = 'copy-btn';
				btn.setAttribute('aria-label', 'Copy to clipboard');
				btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
				block.appendChild(btn);

				btn.addEventListener('click', () => {
					const content = block.querySelector('.code-content') || block;
					// Get all text, but filter out the $ prompt if it's in a separate span
					let text = '';
					const lines = content.querySelectorAll('p, code');
					if (lines.length > 0) {
						lines.forEach(line => {
							if (line.classList.contains('mt-2')) return; // skip success msg
							let lineText = line.textContent.trim();
							if (lineText.startsWith('$ ')) lineText = lineText.substring(2);
							if (lineText.startsWith('#')) return; // skip comments
							text += lineText + '\n';
						});
					} else {
						text = content.textContent.trim();
					}

					navigator.clipboard.writeText(text.trim()).then(() => {
						btn.classList.add('copied');
						const originalIcon = btn.innerHTML;
						btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>';
						setTimeout(() => {
							btn.classList.remove('copied');
							btn.innerHTML = originalIcon;
						}, 2000);
					});
				});
			}
		});
	};

	// Reveal on Scroll
	const setupRevealObserver = () => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add('visible');
					observer.unobserve(entry.target);
				}
			});
		}, { threshold: 0.1 });

		document.querySelectorAll('.animate-reveal').forEach(el => observer.observe(el));
	};

	// Initial Setup
	applyTheme(getStoredTheme());
	applyLang(getStoredLang());
	setupCopyButtons();
	setupRevealObserver();

	// Dropdown Handlers
	const setupDropdown = (trigger, dropdown) => {
		if (trigger) {
			trigger.addEventListener('click', (e) => {
				e.stopPropagation();
				const wasOpen = dropdown.classList.contains('open');
				document.querySelectorAll('.theme-dropdown, .lang-dropdown').forEach(d => d.classList.remove('open'));
				if (!wasOpen) dropdown.classList.add('open');
				trigger.setAttribute('aria-expanded', !wasOpen);
			});
		}
	};

	setupDropdown(themeTrigger, themeDropdown);
	setupDropdown(langTrigger, langDropdown);

	themeOptions.forEach(opt => opt.addEventListener('click', () => applyTheme(opt.getAttribute('data-theme-value'))));
	langOptions.forEach(opt => opt.addEventListener('click', () => applyLang(opt.getAttribute('data-lang-value'))));

	document.addEventListener('click', () => {
		if (themeDropdown) themeDropdown.classList.remove('open');
		if (langDropdown) langDropdown.classList.remove('open');
	});

})();
