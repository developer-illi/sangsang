from audioop import ulaw2lin

from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import send_mail
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_protect
from django.http import HttpResponse
from django.http import JsonResponse
import json
import datetime
from django.contrib import messages
from main.models import *
import logging


# Create your views here.
logger = logging.getLogger(__name__)

@csrf_exempt
def main_page(request):
    arg = {}
    return render(request, 'index.html', arg)

@csrf_exempt
def about_pg(request):
    about = Main_pg.objects.get()
    history = History.objects.all()
    arg = {'history':history,'about':about}
    return render(request, 'sub/about.html', arg)

@csrf_exempt
def contact_pg(request):
    main_page = Main_pg.objects.get()
    history = History.objects.all()
    arg = {'history':history,'main_page':main_page}
    return render(request, 'sub/contact.html', arg)

@csrf_exempt
def project_pg(request):
    project = Project.objects.get(pk=1)
    arg = {'project':project}
    return render(request, 'sub/project.html', arg)

@csrf_exempt
def solution_pg(request):
    solution = Solution.objects.get(pk=1)
    arg = {'solution':solution}
    return render(request, 'sub/solution.html', arg)

@csrf_exempt
def get_val_items(request):
    sol_id = request.GET.get('sol_item_category')
    if sol_id:
        val_items = Sol_content.objects.filter(solutions=sol_id)  # ForeignKey 필드 사용
        items_list = [{'pk': item.pk, 'title': item.title, 'sol_main':sol_id} for item in val_items]
        return JsonResponse({'val_items': items_list})
    return JsonResponse({'val_items': []})

@csrf_exempt
def get_app_items(request):
    app_id = request.GET.get('app_item_category')
    if app_id:
        val_items = Apply_content.objects.filter(apply=app_id)  # ForeignKey 필드 사용
        items_list = [{'pk': item.pk, 'title': item.title, 'app_main':app_id} for item in val_items]
        return JsonResponse({'val_items': items_list})
    return JsonResponse({'val_items': []})

@csrf_exempt
def get_tap_items(request):
    tap_id = request.GET.get('tap_item')
    if tap_id:
        if tap_id == "1":
            val_items = Solutions.objects.all()
            items_list = [{'pk': str(item.pk)+'sol', 'title': item.title, 'app_main':tap_id} for item in val_items]
            return JsonResponse({'val_items': items_list})
        else:
            val_items = Apply.objects.all()
            items_list = [{'pk': str(item.pk)+'app', 'title': item.title, 'app_main': tap_id} for item in val_items]
            return JsonResponse({'val_items': items_list})
    return JsonResponse({'val_items': []})




# Create your models here.

def send_email(request):
    if request.method == 'POST':
        subject = request.POST['subject']
        message = request.POST['message']
        sender_email = 'your-email@example.com'  # 발신자 이메일
        recipient_list = ['recipient@example.com']  # 수신자 이메일 목록

        send_mail(subject, message, sender_email, recipient_list)
        return HttpResponse("이메일이 성공적으로 전송되었습니다!")
    return render(request, 'inquiry.html')


@csrf_exempt
def admin_pg(request):
    arg = {}
    return render(request,'admin/login.html', arg)

@csrf_exempt
def add_history(request):
    if request.method == "POST":
        year = request.POST.get("year")
        print(year)
        control = request.POST.get("content")
        print(control)

        if not year:
            return JsonResponse({"success": False, "message": "내용을 입력해주세요."}, status=400)

        if control:
            history_item = History.objects.get(pk=control)
            history_item.years = year

        else:
            history_item = History.objects.create(years=year)

        history_item.save()
        return JsonResponse({"success": True})

    return JsonResponse({"success": False, "message": "잘못된 요청입니다."}, status=400)

@csrf_exempt
def delete_history(request):
    if request.method == "POST":
        itemId = request.POST.get("itemId")
        if itemId:
            history_item = History.objects.get(pk=itemId)
            history_item.delete()
        else:
            pass

        return JsonResponse({"success": True})

    return JsonResponse({"success": False, "message": "잘못된 요청입니다."}, status=400)

@csrf_exempt
def save_history_item(request):
    if request.method == "POST":
        item_id = request.POST.get("item_id")
        year_id = request.POST.get("year_id")
        month = request.POST.get("month")
        content = request.POST.get("content")

        if not month or not content:
            return JsonResponse({"success": False, "message": "내용을 입력해주세요."}, status=400)

        if item_id:
            history_item = History_content.objects.get(pk=item_id)
            history_item.months = month
            history_item.content = content
        else:
            history = get_object_or_404(History, pk=int(year_id))
            history_item = History_content.objects.create(months=month, content=content, history=history)

        history_item.save()
        return JsonResponse({"success": True})

    return JsonResponse({"success": False, "message": "잘못된 요청입니다."}, status=400)

@csrf_exempt  # (CSRF 검증을 끌 수도 있지만, 프론트에서 CSRF 토큰을 보내는 게 더 안전해)
def delete_history_item(request, item_id):
    if request.method == "POST":
        try:
            # 삭제할 항목 가져오기
            history_item = History_content.objects.get(pk=item_id)
            history_item.delete()

            return JsonResponse({"success": True})
        except History_content.DoesNotExist:
            return JsonResponse({"success": False, "message": "해당 항목을 찾을 수 없습니다."}, status=404)
    return JsonResponse({"success": False, "message": "잘못된 요청입니다."}, status=400)

@csrf_exempt
def about_admin(request):
    if "admin_id" not in request.session:
        return redirect("admin")
    about = Main_pg.objects.get()
    history = History.objects.all()
    arg = {
        'about':about,'history':history
    }
    return render(request, 'admin/about.html', arg)
@csrf_exempt
def sol_admin(request):
    if "admin_id" not in request.session:
        return redirect("admin")

    solution = Solution.objects.get(pk=1)
    arg = {
        'solution':solution
    }
    return render(request, 'admin/solution.html', arg)

@csrf_exempt
def pro_admin(request):
    if "admin_id" not in request.session:
        return redirect("admin")
    project = Project.objects.get(pk=1)
    arg = {'project': project}
    return render(request, 'admin/project.html', arg)

@csrf_exempt  # ❗ CSRF 검증 비활성화 (AJAX 요청이라 필요)
def project_main_update(request):
    if request.method == "POST":
        title = request.POST.get("title")
        print(title)
        image = request.FILES.get("image")
        print(image)

        try:
            # ✅ 프로젝트 데이터 가져오기 (기존 데이터 업데이트)
            project = Project.objects.get(pk=1)  # 첫 번째 프로젝트 선택 (필요에 따라 수정)
            project.title = title

            # ✅ 이미지가 업로드되었으면 저장
            if image:
                project.img = image  # 모델에 저장할 때 경로 설정

            project.save()

            return JsonResponse({"success": True, "message": "프로젝트 정보가 업데이트되었습니다!"})

        except Exception as e:
            return JsonResponse({"success": False, "message": str(e)})

    return JsonResponse({"success": False, "message": "잘못된 요청입니다."})
@csrf_exempt
def project_detail_edit(request):
    if request.method == "POST":
        try:
            project_id = request.POST.get("project_id")
            project_pk = int(project_id)
            title = request.POST.get("project-list__title")
            eg_title = request.POST.get("project-list__sub-title")
            content = request.POST.get("project-list__desc-head")
            details = request.POST.get("project-list__desc-body")

            # 해당 프로젝트 찾기
            project = get_object_or_404(Project_content, pk=project_pk)

            # 값 업데이트
            if title:
                project.title = title
            if eg_title:
                project.eg_title = eg_title
            if content:
                project.content = content
            if details:
                project.details = details

            project.save()  # 변경 사항 저장

            return JsonResponse({"success": True, "message": "업데이트 완료!"})
        except Exception as e:
            return JsonResponse({"success": False, "message": str(e)})

    return JsonResponse({"success": False, "message": "잘못된 요청 방식입니다."})

@csrf_exempt
def project_content_delete(request, item_id):
    """
    프로젝트 컨텐츠 삭제 API
    """
    if request.method == "POST":
        try:
            # item_id에 해당하는 ProjectContent 객체 가져오기
            project_item = get_object_or_404(Project_contentop, pk=item_id)

            # 데이터 삭제
            project_item.delete()

            return JsonResponse({"success": True, "message": "삭제 완료!"})
        except Exception as e:
            return JsonResponse({"success": False, "message": str(e)})

    return JsonResponse({"success": False, "message": "잘못된 요청입니다."})

@csrf_exempt
def project_content_edit(request):
    if request.method == "POST":
        try:
            proj_sub_id = request.POST.get("proj_sub_id")
            title = request.POST.get("project-list__info-item-title")
            content = request.POST.get("project-list__info-item-desc")
            img = request.FILES.get("proj_sub_img")

            # 해당 프로젝트 서브 콘텐츠 찾기
            proj_sub = get_object_or_404(Project_contentop, pk=proj_sub_id)

            # 값 업데이트
            if title:
                proj_sub.title = title
            if content:
                proj_sub.content = content
            if img:
                proj_sub.img = img  # 이미지 업데이트

            proj_sub.save()  # 변경 사항 저장

            return JsonResponse({"success": True, "message": "업데이트 완료!"})
        except Exception as e:
            return JsonResponse({"success": False, "message": str(e)})

    return JsonResponse({"success": False, "message": "잘못된 요청 방식입니다."})

@csrf_exempt
def project_content_create(request):
    if request.method == "POST":
        try:
            # 🔹 FormData로 받은 데이터 처리
            project_id = request.POST.get("project_id")
            project_pk = int(project_id)
            title = request.POST.get("title")
            content = request.POST.get("content")
            image = request.FILES.get("image", None)  # 파일이 없으면 None

            # 🔹 필수 데이터 검증
            if not title or not content:
                return JsonResponse({"success": False, "message": "제목과 내용을 입력해주세요."}, status=400)

            proj_sub = get_object_or_404(Project_title, pk=project_pk)
            # 🔹 새 프로젝트 컨텐츠 객체 생성 및 저장
            new_project = Project_contentop.objects.create(
                title=title,
                content=content,
                img=image,  # 이미지가 없으면 NULL 저장됨
                project_title = proj_sub
            )

            # 🔹 JSON 응답 (새로운 객체의 ID 포함)
            return JsonResponse({"success": True, "message": "저장되었습니다!", "new_id": new_project.pk})

        except Exception as e:
            return JsonResponse({"success": False, "message": str(e)}, status=500)

    return JsonResponse({"success": False, "message": "잘못된 요청입니다."}, status=400)

@csrf_exempt
def admin_login(request):
    if request.method == "POST":
        id = request.POST["username"]
        pw = request.POST["password"]

        try:
            admin = Admin.objects.get(user=id)  # 사용자 조회
        except Admin.DoesNotExist:
            messages.error(request, "아이디 또는 비밀번호가 올바르지 않습니다.")
            return redirect("admin")

        if admin.check_password(pw):  # 비밀번호 검증
            request.session["admin_id"] = admin.id  # ✅ 세션에 로그인 정보 저장
            request.session["admin_user"] = admin.user
            request.session.set_expiry(60 * 60 * 24)  # 24시간 세션 유지
            return redirect("about_admin")  # 로그인 성공 시 이동할 페이지
        else:
            messages.error(request, "아이디 또는 비밀번호가 올바르지 않습니다.")

        return redirect("admin")

def admin_logout(request):
    request.session.flush()  # ✅ 세션 삭제 (로그아웃)
    return redirect("admin")

@csrf_exempt
def admin(request):
    solutions = Solutions.objects.all()
    apply = Apply.objects.all()
    arg = {'solutions': solutions, 'apply':apply}
    return render(request, 'admin.html', arg)

@csrf_exempt
def edit_sol_title(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            title = data.get('title',"").strip()
            solution = Solution.objects.get(pk=1)
            solution.title = title
            solution.save()
            if not title:
                return JsonResponse({"success": False, "message": "제목을 입력하세요."}, status=400)
            return JsonResponse({"success": True, "message": "저장되었습니다!"})
        except Exception as e:
            return JsonResponse({"success": False, "message": str(e)}, status=500)
    return JsonResponse({"success": False, "message": "잘못된 요청입니다."}, status=405)
@csrf_exempt  # CSRF 검증을 우회 (필요하면 제거하고 CSRF 토큰을 사용)
def edit_title_img(request):
    if request.method == "POST":
        try:
            sol_id = request.POST.get("sol_id")  # 요청에서 sol_id 가져오기
            uploaded_file = request.FILES.get("sol_image")  # 업로드된 파일 가져오기
            sol_pk = int(sol_id)
            if not sol_id or not uploaded_file:
                return JsonResponse({"success": False, "message": "필수 데이터가 누락되었습니다."}, status=400)

            solution = Solution_title.objects.get(pk=sol_pk)

            # 저장된 파일 URL을 DB에 저장
            solution.img = uploaded_file  # 모델 필드명이 image라고 가정
            solution.save()

            return JsonResponse({"success": True, "message": "저장 되었습니다."})

        except Solution_title.DoesNotExist:
            return JsonResponse({"success": False, "message": "해당 값이 존재하지 않습니다."}, status=404)
        except Exception as e:
            return JsonResponse({"success": False, "message": str(e)}, status=500)

    return JsonResponse({"success": False, "message": "잘못된 요청 방식입니다."}, status=400)

@csrf_exempt
def edit_soldetail(request):
    if request.method == "POST":
        try:
            sol_details_id = request.POST.get("sol_details_id")
            title = request.POST.get("title")
            eg_title = request.POST.get("eg_title")
            content = request.POST.get("content")
            details = request.POST.get("details")
            detail_pk = int(sol_details_id)
            if not detail_pk:
                return JsonResponse({"success": False, "message": "ID가 없습니다."})

            # 해당 솔루션 세부 정보를 가져오기
            sol_details = get_object_or_404(Solution_content, pk=detail_pk)

            # 데이터 업데이트
            sol_details.title = title
            sol_details.eg_title = eg_title
            sol_details.content = content
            sol_details.details = details
            sol_details.save()

            return JsonResponse({"success": True, "message": "솔루션 상세 정보가 업데이트되었습니다."})

        except Exception as e:
            return JsonResponse({"success": False, "message": str(e)})

    return JsonResponse({"success": False, "message": "잘못된 요청 방식입니다."})

@csrf_exempt
def sol_item_add(request):
    if request.method == 'POST':
        try:
            title = request.POST.get('title')
            content_text = request.POST.get('content')
            content_img = request.FILES.get('image')
            mainId = request.POST.get('mainId')
            contentId = request.POST.get('itemId')
            if not contentId:
                solution_title = get_object_or_404(Solution_title, pk=int(mainId))
                sol_item = Solution_contentop.objects.create(
                    title=title, content=content_text, img=content_img, Solution_title=solution_title)
                sol_item.save()
            else:
                sol_item = get_object_or_404(Solution_contentop, pk=int(contentId))
                sol_item.title = title
                sol_item.content = content_text
                sol_item.img = content_img
                sol_item.save()

            return JsonResponse({'success': True, 'message': '등록되었습니다.'})

        except Exception as e:
            logger.error(f"오류 발생: {e}", exc_info=True)  # 🔥 에러 로그 출력
            return JsonResponse({'success': False, 'message': str(e)})

    return JsonResponse({'success': False, 'message': '잘못된 요청입니다.'})

@csrf_exempt
def delete_sol_item(request):
    if request.method == 'POST':
        try:
            item_id = request.POST.get('itemId')
            print(item_id)
            sol_item = get_object_or_404(Solution_contentop, id=int(item_id))
            sol_item.delete()  # 삭제 실행

            return JsonResponse({"success": True, "message": "삭제되었습니다."}, status=200)
        except Exception as e:
            return JsonResponse({"success": False, "message": str(e)}, status=400)
    return JsonResponse({"success": False, "message": "잘못된 요청입니다."}, status=405)


@csrf_exempt
def app_item_add(request):
    if request.method == 'POST' and request.FILES.get('app_image'):
        title = request.POST['app_title']
        content_text = request.POST['app_content']
        content_img = request.FILES['app_image']
        type = int(request.POST['app_type'])
        selected_category = request.POST['app_item_category']
        app = Apply.objects.get(pk=selected_category)
        app_item = Apply_content.objects.create(title=title, content_text=content_text, content_img=content_img, type=type, apply=app)
        app_item.save()

        return redirect('admin_pg')
    return HttpResponse('false')

@csrf_exempt
def delete_app_item(request, item_id):
    if request.method == 'DELETE':
        try:
            item = Apply_content.objects.get(pk=item_id)
            item.delete()
            return JsonResponse({'success': True})
        except Apply_content.DoesNotExist:
            return JsonResponse({'error': 'Item not found'}, status=404)
    return JsonResponse({'error': 'Invalid request method'}, status=400)

@csrf_exempt
def delete_tap_item(request, item_id):
    if request.method == 'DELETE':
        separator = item_id[-3:]
        if separator == 'sol':
            try:
                id = int(item_id[:-3])
                del_item = Solutions.objects.get(pk=id)
                del_item.delete()
                return JsonResponse({'success': True})
            except Solutions.DoesNotExist:
                return JsonResponse({'error': 'Item not found'}, status=404)
        else:
            try:
                id = int(item_id[:-3])
                del_item = Apply.objects.get(pk=id)
                del_item.delete()
                return JsonResponse({'success': True})
            except Apply.DoesNotExist:
                return JsonResponse({'error': 'Item not found'}, status=404)
    return JsonResponse({'error': 'Invalid request method'}, status=400)

#어바웃단 데이터 추가 및 수정
@csrf_exempt
def alter_about_text(request):
    if request.method == "POST":
        try:
            #데이터 조인
            main_text = request.POST['main_text']
            sub_text = request.POST['sub_text']
            main_img = request.FILES.get("main_img")


            # DB 업데이트 로직
            about_data = Main_pg.objects.get()
            about_data.main_title = main_text
            about_data.sub_script = sub_text
            about_data.main_img = main_img
            about_data.save()

            return JsonResponse({"status": "success", "message": "데이터가 성공적으로 업데이트되었습니다."})
        except Exception as e:
            return JsonResponse({"status": "error", "message": str(e)})
    return JsonResponse({"status": "error", "message": "Invalid request method"}, status=400)


@csrf_exempt
def alter_history(request):
    if request.method == "POST":
        try:
            test= 'test'
            return JsonResponse({"status": "success", "message": "데이터가 성공적으로 업데이트되었습니다."})
        except Exception as e:
            return JsonResponse({"status": "error", "message": str(e)})

    return JsonResponse({"status": "error", "message": "Invalid request method"}, status=400)