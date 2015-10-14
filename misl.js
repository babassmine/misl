Tasks = new Mongo.Collection("tasks");
Vote = new Mongo.Collection("vote");
if (Meteor.isClient) {
    // code to run on server at startup
	Template.body.helpers({
		tasks:function(){
			return Tasks.find({});
		}
	});

	Template.body.events({
			'click .cand':function(event){
				if(Meteor.userId() == null){
					alert("Please sigin to vote");
					Vote.insert({vote: 0 ,user: Meteor.userId()});
				}else{
					if(Vote.findOne(Meteor.userId())){
						alert("You have already voted");
					}else{
						Vote.insert({_id:Meteor.userId(), vote:1});
						var candid = Tasks.findOne(this._id);
						var vote = parseInt(candid.votes)+1;
						Tasks.update(this._id, {$set: {votes: vote}});
						alert("Your vote has been added");
					}
				}
			}
		});
    ServiceConfiguration.configurations.remove({
        service: 'facebook'
    });
    
    ServiceConfiguration.configurations.insert({
        service: 'facebook',
        appId: '1602200270025104',
        secret: 'f9f4dea26f889bbf8061f8f5332c775a',
        loginStyle: 'redirect'
    });
    
}

