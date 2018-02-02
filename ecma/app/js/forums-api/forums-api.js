function ForumsAPI(common, store, view) {

    this.common = common;
    this.store = store;
    this.view = view;

    this.pages = this.loadSubjects();

    this.common.hide(".writeSubject");
    this.initEvents();
}

ForumsAPI.prototype.initEvents = function() {

    var done = this.common.select("#done");
    var that = this;

    if ( done ) {
        done.onclick = function () {
            var subject = that.common.select("#subject").value;
            var content = that.common.select("#content").value;

            var loginMember = that.common.getLoginMember();

            if (!loginMember || !subject || !content) {
                alert("다음 사유 중 하나 이상의 이유로 등록되지 못했습니다.\n1. 로그인이 필요함\n2. 필수 입력값이 누락됨.");
                return false;
            }

            content = that.common.replaceNewLineToBr(content);
            var article = {
                subject: subject,
                writer: loginMember.name,
                writerId: loginMember.id,
                content: content,
                read: 0
            };

            that.store.post("http://localhost:3000/posts", article, function(response) {
                console.log(response);
                that.view.addNewArticle(article, that.pages.init, function clear() {
                    that.common.select("#subject").value = "";
                    that.common.select("#content").value = "";
                });

                that.common.initTextareaHeight();
                that.common.slideUp(".writeSubject");
            });
            //that.store.save(article.number, JSON.stringify(article));


        };
    }

    var write = this.common.select("#write");
    if ( write ) {
        write.onclick = function () {
            that.common.slideDown(".writeSubject");
        };
    }

    var more = this.common.select("#more");
    if ( more ) {
        more.onclick = function () {
            that.pages.next();
        }
    }
};

ForumsAPI.prototype.loadSubjects = function() {
    var page = 1;
    var that = this;
    var subjects = {
        next: function() {

            // Load Data.
            (function () {
                that.store.get("http://localhost:3000/posts?_sort=id&_order=desc&_page="+(++page)+"&_limit=10", "", function(data) {
                    console.log(page);
                    data = JSON.parse(data);
                    if ( data ) {
                        data.forEach(function(eachData) {
                            eachData.number = eachData.id;

                            that.view.addReverseNewArticle(eachData, null, null, function(newRow) {
                                newRow.onclick = function() {

                                    var tbody = this.parentElement;
                                    if ( tbody.rows[this.rowIndex] && tbody.rows[this.rowIndex].className == "detail" ) {
                                        that.view.removeDetailRows(tbody);
                                        return false;
                                    }

                                    that.view.removeDetailRows(tbody);

                                    var number = this.cells[0].innerText;

                                    // var oneData = that.store.getAndConvertJSON(number);
                                    eachData.read++;
                                    this.cells[3].innerText = eachData.read;

                                    that.view.addDetailView(tbody, this.rowIndex, eachData.content);

                                    that.store.put("http://localhost:3000/posts/"+eachData.id, eachData, null);
                                    //that.store.save(oneData.number, JSON.stringify(oneData));
                                };
                            });

                        });

                    }
                });
            })();
        },
        init: function() {
            var tableBody = that.common.select("table > tbody");
            page = 0;
            if ( tableBody ) {
                tableBody.innerHTML = "";
                (that.pages || this).next();
            }
        }
    };

    subjects.init();
    return subjects;
};

window.app = window.app || {};
window.app.ForumsAPI = ForumsAPI;
