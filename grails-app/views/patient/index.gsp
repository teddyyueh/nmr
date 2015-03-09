<!DOCTYPE html>
<html>
<head>
	<meta name="layout" content="main" />
	<title>User Dashboard</title>
</head>
<body>

	<div class="container-fluid panel-body" ng-controller="PatientsCtrl">
		<div class="form-horizontal">
			<div class="form-group">
				<label class="col-sm-3 control-label" for="name">Name</label>
				<div class="col-sm-9">
					<input class="form-control" name="name" placeholder="Enter any part of a patient's name" ng-model="name" ng-model-options="{debounce: 1000}">
				</div>
			</div>
			<div class="form-group">
				<label class="col-sm-3 control-label" for="name">MRN</label>
				<div class="col-sm-9">
					<input class="form-control" name="mrn" placeholder="Enter any part of a patient's MRN" ng-model="mrn" ng-model-options="{debounce: 1000}">
				</div>
			</div>
		</div>
		
		<div>
			<table class="table table-hover table-bordered">
				<thead>
					<tr><th>MRN</th><th>Name</th></tr>
				</thead>
				<tr ng-repeat="patient in patients">
					<td>{{patient.medicalRecordNumber}}</td>
					<td>{{patient.firstName}} {{patient.middleName}} {{patient.lastName}}</td>
				</tr>
			</table>
			<div class="text-center alert alert-warning" ng-hide="patients.length">No patients match the provided criteria.</div>
		</div>
	</div>
</body>
</html>
