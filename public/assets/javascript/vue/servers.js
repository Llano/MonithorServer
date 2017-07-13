

var serverList = {};



staticServers.forEach(function(entry) {
    serverList[entry.server_id] = {ram: "-", cpu: "-", io: "-", name: entry.name};
})

Vue.component('server', {
    props: ["name", "cpu", "io", "ram"],
    template: '<tr><td class="v-a-m">{{name}}</td><td><span class="updating-chart">5,3,9,6,5,9,7,3,5,2,5,3,9,6,5,9,7,3,5,2</span></td><td>{{ram}}</td><td>{{cpu}}</td><td>{{io}}</td></tr>'
    
})

    var vm = new Vue({
    el: "#app",
    data: {server_list: serverList}
})










socket.emit("join", "test");
socket.on('data-from-server', function (data) {
    console.log("data from server");
    });


    

    
    
    setInterval(function() {
        var random = Math.round(Math.random() * 10)
        vm.server_list["test"].cpu = random;
    }, 1000)