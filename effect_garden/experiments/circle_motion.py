"""
Matplotlib Animation Example

author: Jake Vanderplas
email: vanderplas@astro.washington.edu
website: http://jakevdp.github.com
license: BSD
Please feel free to use and modify this, but keep the above information. Thanks!
"""
import math
import numpy as np
from matplotlib import pyplot as plt
from matplotlib import animation
import ipdb

np.core.arrayprint._line_width = 180
np.set_printoptions(edgeitems=30, linewidth=100000,
                    formatter=dict(float=lambda x: "%.3g" % x))

frameInterval = 20  # ms
frames = 2000


# First set up the figure, the axis, and the plot element we want to animate
fig = plt.figure(num=0, figsize=(5, 5))
fig.canvas.set_window_title('Cicle Motion')

ax = plt.axes(xlim=(-1.5, 1.5), ylim=(-1.5, 1.5))
pts = ax.scatter([], [], lw=2)
# ipdb.set_trace()
plt.grid(b=True, which='major', color='#666666', linestyle='-')
plt.minorticks_on()
plt.grid(b=True, which='minor', color='#999999', linestyle='-', alpha=0.2)
# initialization function: plot the background of each frame


def init():
    # line.set_data([], [])

    # y = np.sin(2 * np.pi * (x))

    # pts.set_offsets(np.c_[x, y])
    pts.set_offsets(np.c_[[], []])

    return pts

# animation function.  This is called sequentially
# float t = pow(fract(s_time*u_speed+(float(i)*u_dot_offset)),u_power);
# float s = PI*2.;
# vec2 oo = vec2(sin(t*s), cos(t*s))*0.2;


def animate(i):
    t = i * frameInterval / 1000
    # t *= 100
    # x = np.linspace(0, 2, 1000)
    # x = np.arange(-2.0, 2.0, .1)
    # x += t
    # y = np.sin(2 * np.pi * x)
    # # y = np.sin(2 * np.pi * (x - 0.01 * t))
    # # line.set_data(x, y)

    ts = np.ones(14)
    for i in range(14):
        frac, whole = math.modf(t + i*0.04)
        ts[i] = math.pow(frac, 4)
    # print(ts)
    s = ts*2*np.pi
    x = np.sin(s)
    y = np.cos(s)
    pts.set_offsets(np.c_[x, y])
    return pts


# call the animator.  blit=True means only re-draw the parts that have changed.
anim = animation.FuncAnimation(fig, animate, init_func=init,
                               frames=frames, interval=frameInterval, blit=False)

# save the animation as an mp4.  This requires ffmpeg or mencoder to be
# installed.  The extra_args ensure that the x264 codec is used, so that
# the video can be embedded in html5.  You may need to adjust this for
# your system: for more information, see
# http://matplotlib.sourceforge.net/api/animation_api.html
# anim.save('basic_animation.mp4', fps=30, extra_args=['-vcodec', 'libx264'])

plt.show()
