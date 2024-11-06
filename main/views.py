from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
# Create your views here.

@csrf_exempt
def main_page(request):
    arg = {}
    return render(request, 'main.html', arg)

@csrf_exempt
def header_test(request):
    arg = {}
    return render(request, 'header.html', arg)

@csrf_exempt
def footer_test(request):
    arg = {}
    return render(request, 'footer.html', arg)

@csrf_exempt
def intro(request):
    arg = {}
    return render(request, 'intoduce/intomsg.html', arg)

@csrf_exempt
def sol_intro(request):
    arg = {}
    return render(request, 'solution/solintro.html', arg)

@csrf_exempt
def app_intro(request):
    arg = {}
    return render(request, 'applicaion/appintro.html', arg)

@csrf_exempt
def dron(request):
    arg = {}
    return render(request, 'solution/dron.html', arg)
@csrf_exempt
def bild(request):
    arg = {}
    return render(request, 'solution/construction.html', arg)

@csrf_exempt
def threedmodel(request):
    arg = {}
    return render(request, 'solution/3dmodel.html', arg)
@csrf_exempt
def confessor(request):
    arg = {}
    return render(request, 'solution/confessor.html', arg)


@csrf_exempt
def bride(request):
    arg = {}
    return render(request, 'applicaion/bridge.html', arg)

@csrf_exempt
def social(request):
    arg = {}
    return render(request, 'applicaion/social.html', arg)

@csrf_exempt
def erection(request):
    arg = {}
    return render(request, 'applicaion/erection.html', arg)

@csrf_exempt
def dron_sol(request):
    arg = {}
    return render(request, 'applicaion/dronsol.html', arg)

def inquiry(request):
    arg = {}
    return render(request, 'inquiry.html', arg)