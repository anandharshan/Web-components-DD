var gulp = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    
    browserify = require('gulp-browserify'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    watch = require('watchify');
	var sass = require('gulp-sass');
    var autoprefixer = require('gulp-autoprefixer');
    var imagemin   = require('gulp-imagemin');
    var changed    = require('gulp-changed');
    var handleErrors = require('../util/handleErrors');
    var archiver = require('archiver');
   

	var crypto = require('crypto');
	var fs = require('fs'); 
	var EasyZip = require('easy-zip').EasyZip;
	var runSequence = require('run-sequence');
	var mapping = require('./dependency.js');

function change_modified(component,modified){
	var dependson = [];
		dependson = mapping.depend[component];
		//console.log(dependson);
		dependson.forEach(function(d){
			//console.log(modified.indexOf(d));
			if(modified.indexOf(d)=== (-1)){
				modified.push(d);
			}
		});
		return modified;

}
function create_temp_folder(qd,res){



	qd = JSON.parse(qd);
	console.log('all prompts');
	console.log(qd);
	var folder_name = 'temp' + crypto.randomBytes(4).readUInt32LE(0) + 'folder';


	gulp.task('bjs', function(cb) {
		console.log('inside task one');
	    var initial_js_required = [
		    'dev/assets/libs/modernizr.js',
		    'dev/assets/libs/polyfill.js',
		    'dev/assets/libs/respond.js',
		    'dev/assets/libs/json2.js',
		    'dev/assets/libs/polyfill.js',
		    
		    'dev/assets/libs/jquery-ui.min.js', 
		    'dev/assets/libs/jquery.mousewheel.js',
		    'dev/assets/libs/jquery.jscrollpane.js',
		    
		    
		    'dev/assets/libs/ui-bootstrap-tpls-0.12.0.js',
		    'dev/assets/libs/angular-ui-router.js',
		    'dev/assets/libs/angular-sanitize.js',
		    'dev/assets/libs/angular-mocks.js',
		    'dev/assets/libs/placeholders.js',
		    'dev/assets/libs/tipped.js',  
		    'dev/assets/libs/colResizable.js',
		    'dev/assets/libs/split-container.js',
		    'dev/assets/libs/resizablecolumns.js',
		    'dev/assets/libs/jquery.multisortable.js',
		    'dev/assets/libs/jquery.datepicker.js',
		    'dev/assets/libs/jquery.dragtable.js',
		    'dev/assets/libs/angular-touch.js',  
		    'dev/assets/libs/app.js', 
		    'dev/assets/libs/modalService.js',
		    'dev/assets/libs/modalService.js'
		    ]

		    var modified = [];
		    qd.components.forEach(function(c){
		    	if(c==='CoachMarks'){
		    		modified = change_modified(c,modified);
		    	}
		    	if(c==='FolderTree'){
		    		modified = change_modified(c,modified);
		    	}
		    	if(c==='FormValidations'){
		    		modified = change_modified(c,modified);
		    	}
		    	if(c==='FormElements'){
		    		modified = change_modified(c,modified);
		    	}
		    	if(c==='FormTemplates'){
		    		modified = change_modified(c,modified);
		    	}
		    	if(c==='formRegistration'){
		    		modified = change_modified(c,modified);
		    	}
		    	if(c==='emptyState'){
		    		modified = change_modified(c,modified);
		    	}
		    	if(c==='WizardProgressBar'){
		    		modified = change_modified(c,modified);
		    	}
		    	if(c==='HeaderInlineEditing'){
		    		modified = change_modified(c,modified);
		    	}
		    	if(c==='SliderControl'){
		    		modified = change_modified(c,modified);
		    	}
		    	if(c==='SplitContainer'){
		    		modified = change_modified(c,modified);
		    	}
		    	if(c==='TableBasic'){
		    		modified = change_modified(c,modified);
		    	}
		    	if(c==='TableDragDrop'){
		    		modified = change_modified(c,modified);
		    	}
		    	if(c==='TableFilter'){
		    		modified = change_modified(c,modified);
		    	}
		    	if(c==='TableInlineEdit'){
		    		modified = change_modified(c,modified);
		    	}
		    	if(c==='TableStatic'){
		    		modified = change_modified(c,modified);
		    	}
		    	if(c==='TableQuickView'){
		    		modified = change_modified(c,modified);
		    	}
		    	if(c==='TableBulkActions'){
		    		modified = change_modified(c,modified);
		    	}
		    	if(c==='pagination2'){
		    		modified = change_modified(c,modified);
		    	}
		    	if(c==='Search'){
		    		modified = change_modified(c,modified);
		    	}
		    	if(c==='Calendar'){
		    		modified = change_modified(c,modified);
		    	}
		    	if(modified.indexOf(c)=== (-1)){
		    				modified.push(c);
		    	}
		    	// modified.push(c);
		    	// modified.push(c + '**/*Directives.js');
		    	// modified.push(c + '**/*Controller.js');
		    });
		    console.log('modified array');
		    console.log(modified);
		    var remodified = [];
		    for(i=0;i<modified.length;i++){
		    	remodified.push('dev/modules/'+modified[i]+'/**/*Directives.js');
		    	remodified.push('dev/modules/'+modified[i]+'/**/*Controller.js');

		    }
		    console.log('all index');
		    console.log(qd.components.indexOf('all'));
		    if(qd.components.indexOf('all') >= 0 || qd.components.length === 0){
		    	remodified = [];
		    	remodified.push('dev/modules/**/*Directives.js');
		    	remodified.push('dev/modules/**/*Controller.js');

		    }

		    if(qd.Jquery === 'no'){
		    	initial_js_required.splice(5,0,'dev/assets/libs/jquery-1.9.1.js')
		    }
		    if(qd.Bootstrap === 'no'){
		    	initial_js_required.splice(9,0,'dev/assets/libs/bootstrap.min.js')
		    }

		    if(qd.Angularjs === 'no'){
		    	initial_js_required.splice(10,0,'dev/assets/libs/angular.min.js')
		    }
		    console.log('after remodified');
		    console.log(remodified);
		    initial_js_required.push.apply(initial_js_required,remodified);
		    console.log('initial js required.');
		    console.log(initial_js_required);
	 			var stream = gulp.src(
	 				initial_js_required
		    )
		    .pipe(concat('vmfLibComponents.js'))
		    // .pipe(uglify())
		    .pipe(gulp.dest(__dirname + '/'+ folder_name + '/js'));
		    return stream;
		    

	    
	});
	gulp.task('bcopyfonts', function() {
	    // task 'one' is done now
	    console.log('copying fonts');
	    var stream = gulp.src('dev/assets/fonts/**/*.{ttf,woff,eof,svg}')
	   		.pipe(gulp.dest(__dirname + '/'+ folder_name + '/fonts'));
	   		// console.log(stream);
	   		return stream;
	});
	gulp.task('bimages', function() {
	    // task 'one' is done now
	    var stream =  gulp.src('dev/assets/img/**/*')
		    .pipe(changed(__dirname + '/'+ folder_name + '/images')) // Ignore unchanged files
		    // .pipe(gulpif(global.isProd, imagemin()))    // Optimize
		    .pipe(gulp.dest(__dirname + '/'+ folder_name + '/images'));

	   		return stream;
	});
	gulp.task('bviews', function() {
	    // task 'one' is done now
	    var stream =   gulp.src('dev/*.html')
	    	 .pipe(gulp.dest(__dirname + '/'+ folder_name + '/'));

	   		return stream;
	});

	gulp.task('btemplates', function() {
	    // task 'one' is done now
	    var stream =    gulp.src('dev/templates/*-tpl.html')
	    	 .pipe(gulp.dest(__dirname + '/'+ folder_name + '/templates'));

	   		return stream;
	});

	gulp.task('bstyles',function(){
		var stream = gulp.src(['dev/assets/scss/main_part_1.scss','dev/assets/scss/main_part_2.scss'])
		    .pipe(sass({
		      // sourceComments: global.isProd ? 'none' : 'map',
		      sourceMap: 'sass'
		      // outputStyle: global.isProd ? 'compressed' : 'nested'
		    }))
		    .pipe(autoprefixer(""))
		    .on('error', handleErrors)
		    .pipe(gulp.dest(__dirname + '/'+ folder_name + '/css'));
		    return stream;
	});

	gulp.task('bie7',function(){
		 if(qd.ie7 === 'yes'){
		    	var stream = gulp.src('dev/assets/scss/ie7.scss')
			    .pipe(sass({
			      // sourceComments: global.isProd ? 'none' : 'map',
			      sourceMap: 'ie7sass',
			      // outputStyle: global.isProd ? 'compressed' : 'nested'
			    }))
			    .pipe(autoprefixer("ie_7"))
			    .on('error', handleErrors)
			    .pipe(gulp.dest(__dirname + '/'+ folder_name + '/css'));
			    return stream;

		    }else{
		    	return;
		    }
	});
	gulp.task('bie8',function(){
		 if(qd.ie7 === 'yes'){
		    	var stream = gulp.src('dev/assets/scss/ie8.scss')
			    .pipe(sass({
			      // sourceComments: global.isProd ? 'none' : 'map',
			      sourceMap: 'ie8sass',
			      // outputStyle: global.isProd ? 'compressed' : 'nested'
			    }))
			    .pipe(autoprefixer("ie_8"))
			    .on('error', handleErrors)
			    .pipe(gulp.dest(__dirname + '/'+ folder_name + '/css'));
			    return stream;

		    }else{
		    	return;
		    }
	});









	gulp.task('final', ['bjs','bcopyfonts','bimages','bviews','btemplates','bstyles','bie7','bie8'], function() {
	    
	    
	    final_zip(folder_name,res);
	});

	runSequence('final');
	
}

function final_zip (folder_name,res){
	
	var output = fs.createWriteStream(__dirname + '/'+ folder_name + '.zip');
	output.on('close', function () {
	    console.log(archive.pointer() + ' total bytes');
	    console.log('archiver has been finalized and the output file descriptor has closed.');
	});
	var archive = archiver('zip');

	archive.on('error', function(err){
	    throw err;
	});

	archive.pipe(output);
	archive.bulk([
	  {
	    expand: true,
	    cwd: __dirname + '/'+ folder_name,
	    src: ["**/*"],
	    dest: '/',
	    dot: true
	  }
	]);
	archive.finalize();


	setTimeout(function(){ res.send(folder_name); }, 10000);
		

}

function final_zip_send(folder_name,res){

	var path = __dirname + '/'+folder_name+'.zip';
	
	var readStream = fs.createReadStream(path);
    
    readStream.pipe(res);

}



exports.concat_js = function(qd,res) {

 create_temp_folder(qd,res);
 return ;
}