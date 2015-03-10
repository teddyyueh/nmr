<!DOCTYPE html>
<html>
<head>
	<meta name="layout" content="main" />
	<title>User Dashboard</title>
</head>
<body>
	<div class="container-fluid panel-body" ng-controller="PatientsCtrl">
		<div class="form-horizontal">
			<div class="form-group col-sm-2">
				<button class="btn btn-default" data-modal-trigger data-template-url="/assets/partials/user/patient/form.html">Add Patient</button>
			</div>
			<div class="form-group col-sm-5">
				<label class="col-sm-2 control-label" for="name">MRN</label>
				<div class="col-sm-10 no-gutter">
					<input class="form-control" name="mrn" placeholder="Enter any part of a patient's MRN" ng-model="mrn" ng-model-options="{debounce: 500}">
				</div>
			</div>
			<div class="form-group col-sm-5">
				<label class="col-sm-2 control-label" for="name">Name</label>
				<div class="col-sm-10 no-gutter">
					<input class="form-control" name="name" placeholder="Enter any part of a patient's name" ng-model="name" ng-model-options="{debounce: 500}">
				</div>
			</div>
		</div>
		
		<div>
			<table ng-cloak class="table table-hover table-bordered">
				<thead>
					<tr><th>MRN</th><th>Name</th></tr>
				</thead>
				<tr dir-paginate="patient in patients | itemsPerPage:itemsPerPage">
					<td class="col-sm-3">{{patient.medicalRecordNumber}}</td>
					<td class="col-sm-9">{{patient.firstName}} {{patient.middleName}} {{patient.lastName}}</td>
				</tr>
			</table>
			<div ng-cloak class="text-center alert alert-warning" ng-hide="patients.length">No patients match the provided criteria.</div>
		</div>
		<div dir-pagination-controls></div>
	</div>
</body>
</html>
