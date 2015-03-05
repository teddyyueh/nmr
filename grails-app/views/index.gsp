<!DOCTYPE html>
<html>
<head>
	<meta name="layout" content="main" />
	<title>Welcome to Grails</title>
	<style>
		.draggable {
			width: 90px;
			height: 80px;
			padding: 5px;
			float: left;
			margin: 0 10px 10px 0;
			font-size: .9em;
		}
		
		.ui-widget-header p, .ui-widget-content p {
			margin: 0;
		}
		
		.workspace {
			height: 1000px;
		}
		
		#snaptarget {
			height: 140px;
		}
	</style>
</head>
<body>
	<div ng-controller="ComplaintCtrl">
		<button ng-click="openComplaintModal()">Add Complaint</button>
	</div>
	
	<button data-workspace-panel-trigger="click" data-template-url="/complaint/create.html?id=yay" data-workspace-selector="#workspace" data-workspace-panel-scope-params='{"id":"teddy"}'>New Add Complaint</button>

	<button data-workspace-panel-trigger="click" data-template-url="/user/patient/form.html" data-workspace-selector="#workspace" >Add Patient</button>
	
	<div id="workspace" data-workspace="true">
	
		<div id="snaptarget" class="ui-widget-header">
			<p>I'm a snap target</p>
		</div>
	
		<div id="draggable" class="draggable ui-widget-content" data-workspace-panel='{ "snap": true }'>
			<div class="ui-widget-header" data-draggable-handle>Handle</div>
			<p>Default (snap: true), snaps to all other draggable elements</p>
		</div>

		<div id="draggable2" class="draggable ui-widget-content" data-workspace-panel='{ "snap": "#snaptarget" }'>
			<div class="ui-widget-header" data-draggable-handle>Handle</div>
			<p>I only snap to the big box</p>
		</div>

		<div id="draggable3" class="draggable ui-widget-content" data-workspace-panel='{ "snap": "#snaptarget", "snapMode": "outer" }'>
			<div class="ui-widget-header" data-draggable-handle>Handle</div>
			<p>I only snap to the outer edges of the big box</p>
		</div>

		<div id="draggable4" class="draggable ui-widget-content" data-workspace-panel='{ "grid": [ 20, 20 ] }'>
			<div class="ui-widget-header" data-draggable-handle>Handle</div>
			<p>I snap to a 20 x 20 grid</p>
		</div>

		<div id="draggable5" class="draggable ui-widget-content" data-workspace-panel='{ "grid": [ 80, 80 ] }'>
			<div class="ui-widget-header" data-draggable-handle>Handle</div>
			<p>I snap to a 80 x 80 grid</p>
		</div>

		

	</div>
</body>
</html>
