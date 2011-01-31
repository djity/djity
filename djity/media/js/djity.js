
function initHeader(){
	/*
	 * encapsulate all header initialization function
	 */
	widgetify();
	init_right_tabs();
	if (manage_perm){
		project_manage_buttons();
	}
	else {
		project_subscribe_button();
	}
	portal_parameters();
	parent_projects(); 
	children_projects();
	toolbar();
	paginator();
	init_tag();
};

function parent_projects() {
	$('#parent_projects a').button({
		icons:{
		    primary:'ui-icon-carat-1-e'
			}
	})
	.addClass('dj-mini-button');
};

function portal_parameters() {
	$('#logout_button').click(
		function(){
			Dajaxice.djity.portal.logout('Dajax.process',{});	
		});

	$('#login_dialog').dialog({
		autoOpen:false,
		modal:true,
		show:'blind',
		buttons:{
			'Login': function() {
				Dajaxice.djity.portal.login(
				'Dajax.process',{
					'project_name':project_name,
					'module_name':module_name,
					'path':path,
					'username':$('#login_username').val(),
					'password':$('#login_password').val(),
				});
			}
		}
	})
	$('#login_button').click(function(){
		$('#login_dialog').dialog('open');
	});

	register_dialog();
	profile_dialog();
	
	$('#portal_parameters a,button')
		.addClass('dj-mini-button');

	choose_language_button();
	$('#portal_parameters').buttonset();
	$('#portal_parameters').removeClass('ui-helper-hidden');
};

function login_dialog_close(){
	$('#login_dialog').dialog('close');
};

function login_dialog_error(message) {
	$('#login_dialog_error')
	.text(message)
	.addClass('ui-state-error');
};

function children_projects () {
	$('#children_projects a').button({
		icons : {
			primary : 'ui-icon-triangle-1-se'
			}
	});
};

function project_manage_buttons () {

		create_project_dialog();
		$('#create_project_button').button({
			icons: {
				primary: 'ui-icon-circle-plus'
			},
			text: false
		})
		.addClass('ui-corner-tl')
		.click(function(){
				$('#create_project_dialog').dialog('open');
				return false;
		});

		manage_users_dialog();
		$('#manage_users_button').button({
			icons: {
				primary: 'ui-icon-person'
			},
			text: false
		})
		.addClass('ui-corner-tr')
		.click(function(){
				$('#manage_users_dialog').dialog('open');
				return false;
		});

		project_visibility_dialog();
		if(project_public){
			visibility_icon = 'ui-icon-unlocked';
		}else{
			visibility_icon = 'ui-icon-locked';
		}
		$('#project_visibility_button').button({
			icons: {
				primary: visibility_icon
			},
			text: false
		})
		.addClass('ui-corner-bl')
		.click(function(){
			$('#project_visibility_dialog').dialog('open');
			return false;
		})
		.css('clear:right');

		//project_style_dialog();
		$('#project_style_button').button({
			icons: {
				primary: 'ui-icon-pencil'
			},
			text: false
		})
		.addClass('ui-corner-br')
		.click(function(){
				themeroller_frame();
				return false;
				}		
		);

		$('#project_buttons a')
			.removeClass('ui-corner-all');

		$('#project_buttons').removeClass('ui-helper-hidden');
};

function create_project_dialog(){
	/*
	 * Create project creation dialog 
	 */
	$("#create_project_dialog").dialog({
			autoOpen:false,
			modal: true,
			resizable:false,
			show:'blind',
			buttons: {
				Ok : function() {
					$(this).dialog('close');
					Dajaxice.djity.project.create_project(
						'Dajax.process',{
						'project_name':project_name,
						'module_name':module_name,
						'path':path,
						'name': $('#new_project_name').val(),
					});	
					
				},
				Cancel: function() {
					$(this).dialog('close');
				}
			}
		});
};


function manage_users_dialog(){
	/*
	 * Create users management dialog
	 */
	$('#manage_users_dialog').dialog({
		autoOpen:false,
		modal: true,
		show:'blind',
		buttons : {
			OK : function(){
				
				users = {};
				$(this).find('input:radio:checked')
				.each(function(i){
						users[this.name] = $(this).val();
				});

				Dajaxice.djity.project.manage_users(
					'Dajax.process',{
						'project_name':project_name,
						'module_name':module_name,
						'path':path,
						'users': users,
						'target':'#manage_users_dialog'
					});

			},
			Cancel : function(){
				$(this).dialog('close');
			}
		},
		open: function(event,ui){
			Dajaxice.djity.project.manage_users(
				'Dajax.process',{
					'project_name':project_name,
					'module_name':module_name,
					'target':'#manage_users_dialog_table'
				});
		},
	});
};

function themeroller_frame(){
	if($("#themeroller_frame").attr('src') == undefined){
		var themeroller_url = $("#themeroller_url").attr('href');
		$("#themeroller_frame").attr('src',themeroller_url);
		$("#themeroller_container").draggable({handle:'#themeroller_handle'});
	};
	if($("#themeroller_container").css('display') == 'block'){
		$("#themeroller_container").css('display','none');
		$("#project_style_button").toggleClass('ui-state-highlight')
	}else{
		$("#themeroller_container").css('display','block');
		$("#project_style_button").toggleClass('ui-state-highlight')
	};
}

function project_style_dialog(){
	/*
	 * Create project style edition dialog
	 */
	$('#project_style_dialog').dialog({
		autoOpen:false,
		modal: false,
		show:'blind',
		resizable:true,
		autoResize:true,
		height:'400',
		dialogClass:'themeroller_dialog',
	});
};


function project_visibility_dialog(){
	$('#project_visibility_dialog').dialog({
		autoOpen: false,
		modal: true,
		show:'blind',
		buttons : {
			OK : function(){
				Dajaxice.djity.project.project_visibility(
					'Dajax.process',{
						'project_name':project_name,
						'module_name':module_name,
						'path':path,
						'visibility':$('#project_visibility').val(),
					});
				$('#project_visibility').val(),
				$(this).dialog('close');
			},
			Cancel : function(){
				$(this).dialog('close');
			}
		}
	});
}

function manage_users_dialog_widgetify(){
	$('#manage_users_dialog_table').buttonset();
	$('#manage_users_dialog_table label')
	.css('width','100%')
	.addClass('ui-corner-all');

	$('#manage_users_dialog_table th')
		.addClass('ui-widget-header');

	$('#manage_users_dialog')
		.dialog("option","width",'auto')
	    .dialog("option","height",'auto')
	    .dialog("option","position",'center')


}
function manage_users_dialog_close(){
	$('#manage_users_dialog').dialog('close');
};

function manage_users_dialog_error(message) {
	$('#manage_users_dialog_error')
	.text(message)
	.addClass('ui-state-error');
};



function project_subscribe_button(){
	$("#project_subscribe_dialog").dialog({
		autoOpen:false,
		modal:true,
		show:'blind',
		buttons:{
			Ok:function(){
			},
			Cancel:function(){
				$(this).dialog('close');
				return false;
			}
		}

	})

	switch(role){
		case 'awaiting':
			button_label = "Cancel subscription";
			break;
		case 'anonymous':
			button_label = "Subscribe";
			break;
		default:
			button_label = "Unsubscribe";
	}
		
	$("#project_subscribe_button")
		.button({
			disabled:(role=='awaiting'),
			icons: {
				primary:'ui-icon-person'
			},
			text:false,
			label:button_label,
		});
	
	if(anonymous){
		$("#project_subscribe_button")
			.click(function(){
					$('#project_subscribe_dialog').dialog('open');
					return false;
			});
	}
	else{
		$("#project_subscribe_button")
			.click(function(){
					Dajaxice.djity.project.project_subscribe(
						'Dajax.process',{				
							'project_name':project_name,
							'module_name':module_name,
						});
					})


		
	}
	$('#project_buttons').removeClass('ui-helper-hidden');
};

function subscribe(){

};

function register_dialog(){
	/*
	 * Create users management dialog
	 */
	$('#register_dialog').dialog({
		autoOpen:false,
		modal: true,
		show:'blind',
		buttons : {
			OK : function(){

				Dajaxice.djity.portal.register(
					'Dajax.process',{
						'username': $('#id_username').val(),
						'email': $('#id_email').val(),
						'password1': $('#id_password1').val(),
						'password2': $('#id_password2').val(),
						
					});

			},
			Cancel : function(){
				$(this).dialog('close');
			}
		},
		open: function(event,ui){
			Dajaxice.djity.portal.register(
				'Dajax.process',{
					'username': '',
					'email': '',
					'password1': '',
					'password2': '',
				});
		},
	});

	$('#signup_button').click(function(){
			$('#register_dialog').dialog('open');
			return false;
		});

};

function register_dialog_post_assign(){
	$('#register_dialog')
		.dialog("option","width","auto")
		.dialog("option","height","auto")
		.dialog("option","position","center");
}


function profile_dialog(){
	/*
	 * Profile Dialog
	 */
	$('#profile_dialog').dialog({
		autoOpen:false,
		modal: true,
		show:'blind',
		buttons : {
			OK : function(){

				Dajaxice.djity.project.profile(
					'Dajax.process',{
						'project_name':project_name,
						'password1': $('#id_password1').val(),
						'password2': $('#id_password2').val(),
						
					});

			},
			Cancel : function(){
				$(this).dialog('close');
			}
		},
		open: function(event,ui){
			Dajaxice.djity.portal.profile(
				'Dajax.process',{
					'project_name':project_name,
					'password1': '',
					'password2': '',
				});
		},
	});

	$('#profile_button').click(function(){
			$('#profile_dialog').dialog('open');
			return false;
		});

};

function profile_dialog_post_assign(){
	$('#profile_dialog')
		.dialog("option","width","auto")
		.dialog("option","height","auto")
		.dialog("option","position","center");
}

function choose_language_button(){
	$("#choose_language_dialog").dialog({
		autoOpen:false,
		modal:true,
		show:'blind',
	});

	$("#choose_language_dialog a")
	.each(function(i,head){
			$(head).button({
				icons:{
					primary:'dj-icon-' + $(head).attr('id').substring (5,7)
				}
				
			});
	});
		
	$("#choose_language_button")
		.button({
			icons: {
				primary: 'dj-icon-'+LANGUAGE_CODE
			},
			text: false
		})
		.click(function(){
			$('#choose_language_dialog').dialog('open');
			return false;
		});
};



function widgetify() {
	$("input:submit").button();
	
	$('#right_tabs_list li')
		.css("height","22px")
		.css("line-height","0.5");
	
	$('#right_tabs_list  li ul')
		.css("display","none");
	
	$("#right_tabs_list  li").hover(
		  function () {
				  $(this).addClass("ui-state-hover");
			},
		   function () {
				$(this).removeClass("ui-state-hover");
			}
	);

	$('#messages').children('div').box();

	if(edit_perm){
		$(".dj-editable").each(function(i,e){$(e).editable({save_function:eval(e.id +'_callback')});});
	}
}

function init_right_tabs() {
	/*
	 * Function called when document is loaded
	 * Create a scrolling menu for the right navigation tabs
	 *
	 */
		
	if (manage_perm){
		$("#right_tabs_list").disableSelection();
		$('#right_tabs_list').sortable({

			placeholder: 'dj-sorting-tab ui-state-highlight dj-mini-button',
			update: function(event, ui) { 
				Dajaxice.djity.project.save_tab_order(
					'Dajax.process',{
						'project_name':project_name,
						'array':$('#right_tabs_list').sortable('toArray')
				
					});	
			}
		});
	}

	/*
	 * Create delete tab dialog 
	 */

	$('#' + tab_name + '-delete')
		.dialog({
			autoOpen:false,
			modal: true,
			resizable:false,
			show:'blind',
			buttons: {
				Ok : function() {
					$(this).dialog('close');
					Dajaxice.djity.project.delete_tab(
						'Dajax.process',{
						'project_name':project_name,
						'module_name':module_name,
				
					});	
				},
				Cancel: function() {
					$(this).dialog('close');
				}
			}
		});

	//bind edit name dialog
	$('#' + tab_name + ' .ui-icon-close')
		.click(function(){
				$('#' + tab_name + '-delete').dialog('open');
				return false;
		});

	/*
	 * Create a edit name dialog 
	 */

	$('#' + tab_name + '-change-name')
		.dialog({
			autoOpen:false,
			modal: true,
			resizable:false,
			show:'blind',
			open: function(event,ui){ 
				$('#' + tab_name + '-title').val(
					$('#' + tab_name ).find('a')[0].textContent
					);
				
			},
			buttons: {
				Ok : function() {
					$(this).dialog('close');
					$('#' + tab_name ).find('a')[0].textContent = $('#' + tab_name + '-title').val();
					Dajaxice.djity.project.save_tab_name(
						'Dajax.process',{
						'project_name':project_name,
						'module_name':module_name,
						'LANGUAGE_CODE':LANGUAGE_CODE,
						'label': $('#' + tab_name + '-title').val(),
				
					});	
					
				},
				Cancel: function() {
					$(this).dialog('close');
				}
			}
		});

	//bind edit name dialog
	$('#' + tab_name + ' .ui-icon-wrench')
		.click(function(){
				$('#' + tab_name + '-change-name').dialog('open');
				return false;
		});


	
	/*
	 *  Bind add tab button
	 */
	$('#create_tab_button')
		.click(function(){
				$('#create_tab_dialog').dialog('open');
				return false;
		})
		.button({
			icons: {
				primary: 'ui-icon-circle-plus'
			},
			text : false,
		})
	
	$('#create_tab_dialog')
		.dialog({
			autoOpen:false,
			modal: true,
			resizable:false,
			show:'blind',
			open: function(event,ui){
				Dajaxice.djity.project.get_module(
					'Dajax.process',{
					'project_name' : project_name,
					}
				
				);
				$("#module_list").change(function () {
						$('#new_tab_name')
							.val($("#module_list option:selected").text())
							.select();	
					});
			},
			
			buttons: {
				Ok : function() {
					$(this).dialog('close');
					Dajaxice.djity.project.add_module(
						'Dajax.process',{
							'project_name':project_name,
							'tab_name':$('#new_tab_name').val(),
							'module_type':$("#module_list option:selected").val(),
						}
					);		
				},
				Cancel: function() {
					$(this).dialog('close');
					}
			}
			});
	$('#right_tabs').removeClass('ui-helper-hidden');
};

function initAmazonGroups() {
	 /*
	 * Function called by amazon publicity porlet
	 * Create an accordion style menu from the list of groups of products
	 *
	*/
	$(function() {
		$("#amazon_groups").accordion();
		$("#amazon_groups h3").each(function(i,head){
			$(head).addClass('dj-mini-button');
		});
	});
};

function toolbar() {
	$("#toolbar").buttonset();
	$("#toolbar a")
		.button()
		.addClass('dj-mini-button');
};

function paginator() {
	$('#paginator a')
		.button()
		.addClass('dj-mini-button');
	
	$('#paginator .off')
		.button('option','disabled','true');
	
	$('#paginator .active')
		.unbind()
		.addClass('ui-state-active');

	$('#paginator').removeClass('ui-helper-hidden');
	left = $('#paginator').width()/2 - ($('.page').width()/2 +$('.previous').width())  ;
	$('.pages').css('padding-left',left+'px');



}

function init_tag(){
	$('.tag').box({
			closeable:manage_perm,
			icon: 'ui-icon-tag',
			state: 'ui-state-default',
			close: function (){
				eval(this.id+'_callback')(this.id);
			}
	});
	$(".new_tag")
		.autocomplete({
			source:["youen","lixia","alban"],
			select:function(event,ui){
			$('<span class="tag"><p><a>' + ui.item.value + '</a></p></span>')
				.box({
					closeable:manage_perm,
					icon: 'ui-icon-tag',
					state: '',
					effect:'',
				})
				.insertBefore(this);
				
				$(this).val('new tag');
				this.select();
				// stop event ! http://stackoverflow.com/questions/2561903/clear-form-field-after-select-for-jquery-ui-autocomplete
				return false; 
			}
		})
		.focus(function(){
			// Select input field contents
			this.select();
		});
	
}

/* Define tools function  */

function message(msg) {
	msg_div = $('<div class="ui-helper-hidden" ><p>'+msg +'</p></div>');
	$('#messages').prepend(msg_div);
	msg_div.box({closeable:true,effect:'slide',delay:10000});

}

function save_text_portlet(id,html) {
	/*
	 * save change for a text portlet 
	 *
	 */	
	Dajaxice.djity.portlet.save_text_portlet(
			'Dajax.process',{
			'project_name':project_name,
			'LANGUAGE_CODE':LANGUAGE_CODE,
			'div_id':id,
			'html':html,
			}
	);	
}

function project_title_callback(id,html){
		Dajaxice.djity.project.save_project_title(
				'Dajax.process',{
				'project_name':project_name,
				'LANGUAGE_CODE':LANGUAGE_CODE,
				'div_id':id,
				'html':html,
		}
																							);	
}

/* Define jquery-ui custom widgets for djity */


$.widget("ui.box", {

	options : {
		icon: 'ui-icon-info',
		state: 'ui-state-highlight',
		closeable: false,
		effect: '',
		delay: false,
		
	},

	_create: function() {
		var self = this,
			options = self.options,
			uiBox = (self.uiBox = self.element)
					  .addClass('dj-box ui-corner-all ' + self.options.state),



			uiInner = (self.uiInner = self.element.find('p'))
				.prepend($('<span  class="ui-icon ' + self.options.icon +'"></span>'))

			if( options.closeable){
				closeIcon = $('<span  class="ui-icon ui-icon-circlesmall-close"></span>')
						.click(function() {
							self.close();
						});
				uiInner.append(closeIcon);
			}
				
			uiBox
				.show(options.effect)
				.fadeOut(options.delay,function(){self.close();});

			
		

	},

	close : function(event){
		var self = this;
		self._trigger('close',event,{id:self.uiBox.id});

	}
});


$.widget("ui.editable",{
		/* 
		 * HTML5 editable
		 */
	options : {
			show :'',
			autoOpen:false,
			save_function : function(){},
			buttons :  
			[[{name:'save',icon:'ui-icon-disk',label:'save'}],
			[{name:'bold'},{name:'italic'},{name:'underline'}]],
			effect:'clip',
	},
	_create: function() {
		var self=this,
			options = self.options,
			id = self.element.id,
			editorBox = (self.editorBox =  $('<div></div>'))
					 .appendTo(document.body)
					 .css('position','absolute')
			         .hide()
					 .addClass('ui-widget ui-widget-header dj-editor-box ui-corner-top'),

			
			_isOpen = false,
			doc = (self.doc = self.element)
				.blur(function(){
					//self.close();
				})
				.focus(function(){
					self.open();
				})

			
			doc.attr('contentEditable',true);
			
		self._create_buttons(options.buttons);
	},
	_create_buttons : function(buttons){
			var self = this,
				options = self.options,
				editorBox = self.editorBox;
			$(buttons).each(function(index,button_group){
					var current_group = $('<span></span>')
					$(button_group).each(function(index,b){

						$('<a href="#" class='+b.name+' title='+b.label +'>'+b.name+'</a>')
							.button({
								icons:{
									'primary':b.icon
								},
								text:false,
								label:b.label,
								
							})
							.addClass('dj-mini-button')
							.click(	function (event){eval('self.'+b.name +'()');})
							.appendTo(current_group);
					});
					current_group
						.buttonset()
						.appendTo(editorBox);
			});

			editorBox.position({
						my:'left bottom',
						at:'left top',
						of:self.element,
					 })

					
    },

	_init: function() {
		    if ( this.options.autoOpen ) {
				this.open();
			}
	},
	close : function(){

			var self = this,
				options = self.options,
				editorBox = self.editorBox;

			editorBox.hide(options.effect);
			self.doc
				.removeClass('ui-state-highlight')
			self._isOpen = false;

			
	},


	isOpen: function() {
				return this._isOpen;
	},

	

	open : function(){
		if (this._isOpen) { return; }

			var self = this,
				options = self.options,
				
				editorBox = self.editorBox;
			editorBox
				.show(options.effect);
					
			self.doc.addClass('ui-state-highlight')
			self._isOpen  = true;
			
			  
	},

	save : function(){
			var self = this,
				options = self.options,
				editorBox = self.editorBox;
			self.options.save_function(self.element.attr('id'),self.element.html());
			self.close();	
	},

	bold : function(){
			document.execCommand ('bold', false, null);
	},
	italic : function(){
			document.execCommand ('italic', false, null);
	},
	underline : function(){
			document.execCommand ('underline', false, null);
	},

});

$.widget("ui.lefttabs", {
	/* This widget transforms a div containing a list of links into a left
	 * menu for djity
	 */
	options: {
		position: 'left'
	},
	_create: function() {
		// fetch elements to act upon
		this.current = $('#' + this.element.find('.active_tab').text());
		this.list = this.element.find('ol,ul').eq(0);
		this.lis = $('li:has(a[href])', this.list);

		// set default style classes
		this.element.addClass('ui-widget');
		this.list.addClass('ui-tabs-nav ui-helper-reset ui-helper-clearfix');
		this.lis.addClass('ui-state-default ui-corner-left');
		// make tabs large
		this.lis.each(function(i,li){
			li.style.height = '20px';
			li.style.marginBottom = '5px';
		});

		// add hover reaction on tabs
		$(this.lis).hover(
			function () {
				$(this).addClass("ui-state-hover");
			},
			function () {
				$(this).removeClass("ui-state-hover");
			}
		);

		// change display of current tab
		this.current.addClass("ui-tabs-selected");
		this.current.addClass("ui-state-active");
		this.current[0].style.width = '100%';
	},
});


