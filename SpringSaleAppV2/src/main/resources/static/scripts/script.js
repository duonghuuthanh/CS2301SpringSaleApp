function deleteProduct(url) {
    if (confirm("Ban chac chan xoa khong?") == true) {
        fetch(url, {
            method: 'delete'
        }).then(res => {
            if (res.status === 204)
                location.reload();
            else
                alert("He thong co loi! Vui long quay lai sau!");
            
        });
    }
}