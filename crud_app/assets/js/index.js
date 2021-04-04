$("#add_user").submit(function(event){
    alert("Dados inseridos com sucesso!");
})

$("#update_user").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })

    var request = {
        "url": `http://localhost:3000/api/users/${data.id}`,
        "method":"PUT",
        "data":data
    }

    $.ajax(request).done(function(response){
        alert("Dados atualizados com sucesso!");
    })
})

if(window.location.pathname == "/"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url": `http://localhost:3000/api/users/${id}`,
            "method":"DELETE"
        }

        if(confirm("Tem certeza que quer deletar este registro?")){
            $.ajax(request).done(function(response){
                alert("Dados excluídos com sucesso!");
                location.reload();
            })
        }
    })
}