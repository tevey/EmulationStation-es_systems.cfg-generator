<?php 
	$title = "Emulationstation Systems Generator";
	$description = "A tool for generating the es_systems.cfg file for EmulationStation";
 ?>
<!DOCTYPE html>
<html>
<head>
	<title><?=$title;?></title>
	<meta charset="utf-8"/>
	<meta name="viewport" content="width=device-width, target-densitydpi=device-dpi, maximum-scale=1, minimum-scale=1"/>

	<meta property="og:title" content="<?=$title;?>" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="" />
	<meta property="og:description" content="<?=$description;?>" />

	<meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:site" content="@_tEvEy">
	<meta name="twitter:title" content="<?=$title;?>">
	<meta name="twitter:description" content="<?=$description;?>">

	<meta name="application-name" content="<?=$title;?>"/>
	<meta name="description" content="<?=$description;?>" />
	<meta name="author" content="tevey (@_tEvEy)">
	<meta name="keywords" content="EmulationStation, rom, emulator"/>

	<link rel="stylesheet" type="text/css" href="/css/reset.css"/>
	<link rel="stylesheet" type="text/css" href="/css/master.css"/>
	<script type="text/javascript" src="/js/libraries.js"></script>
	<script type="text/javascript" src="/js/script.js"></script>
</head>
<body>
	<h1>EmulationStation es_systems.cfg generator</h1>
	<p><span class="code">es_systems.cfg</span> is the main configuration file for EmulationStation. It is located at <span class="code">~/.emulationstation/es_systems.cfg</span> . It is an XML document that defines a list of systems .</p>
	<form id="system-form">
		<select class="system-select">
			<option value="none">Select System</option>
		</select>
		<br>
		<input type="text" id="path" placeholder="Path to roms" required>
		<p class="help-button path-help-button">?</p><br>
		<p class="path-help help-content">The path to the top-most folder to start searching for games in. If the first character is '~', it will be expanded to the home folder. All subdirectories will be included. You can use forward slashes for any platform and backslashes on Windows.</p>
		<input type="text" id="command" placeholder="Launch Command" required>
		<p class="help-button command-help-button">?</p>
		<div class="command-help help-content">
			<p>Launch commands depend on what emulator you want to use. 95% of the time, <span class="code">/path/to/emulator %ROM%</span> or <span class="code">C:\path\to\emulator.exe "%ROM_RAW%"</span> works. If you're using MAME, <span class="code">/path/to/mame %BASENAME%</span> should do the trick. The following strings are replaced in your launch command:</p>
			<br>
			<ul>
				<li><span class="code">%ROM%</span> - Replaced with the shell-escaped absolute path to the selected ROM. On Linux, most Bash special characters are escaped with a backslash. On Windows, the ROM path is automatically enclosed in quotes, which is equivalent to "%ROM_RAW%" (as of version 2.0.1).</li>
				<li><span class="code">%BASENAME%</span> - Replaced with the "base" name of the path to the selected ROM. For example, a path of "/foo/bar.rom", this tag would be "bar". This tag is useful for setting up MAME.</li>
				<li><span class="code">%ROM_RAW%</span> - Replaced with the unescaped, absolute path to the selected ROM. If your emulator is picky about paths or you are on Windows, you might want to use this instead of %ROM%, but enclosed in quotes. For example: higan "%ROM_RAW%" .</li>
			</ul>
		</div><br>
		<button class="add-button">Add System</button>
	</form>
	<h3>Systems added:</h3>
	<ul class="added-systems">
	</ul>
	<button class="download-button">Download es_systems.cfg</button>
	<p>Get more info about EmulationStation and download at <a href="http://emulationstation.org" target="_blank">emulationstation.org</a></p>
</body>
</html>